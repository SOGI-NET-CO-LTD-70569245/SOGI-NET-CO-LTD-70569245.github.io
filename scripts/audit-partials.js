#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlRoot = path.join(root, 'src', 'html');
const partialRoot = path.join(root, 'src', 'partial');
const docsRoot = path.join(root, 'docs');

const DIRECTIVES = new Set([
  'else',
  'for',
  'if',
  'include',
  'loop',
]);

function isDir(dir) {
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

function walk(dir) {
  if (!isDir(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.isFile() ? [fullPath] : [];
  });
}

function rel(filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function mdEscape(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function csvEscape(value) {
  const text = String(value);
  if (!/[",\r\n]/.test(text)) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

function countBy(items, key) {
  const map = new Map();
  for (const item of items) {
    const name = typeof key === 'function' ? key(item) : item[key];
    map.set(name, (map.get(name) || 0) + 1);
  }
  return map;
}

function sortCounts(map) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }));
}

function resolveInclude(fromFile, includePath) {
  let target = path.resolve(path.dirname(fromFile), includePath);
  if (!path.extname(target)) target += '.html';
  return target;
}

function collectVariables(text) {
  const variables = new Set();
  const dataRoots = new Set();

  for (const match of text.matchAll(/context\.([A-Za-z][A-Za-z0-9_]*)/g)) {
    variables.add(match[1]);
  }

  for (const match of text.matchAll(/@@([A-Za-z][A-Za-z0-9_]*)/g)) {
    const name = match[1];
    if (!DIRECTIVES.has(name)) variables.add(name);
  }

  for (const match of text.matchAll(/JSON\.stringify\(([A-Za-z_$][A-Za-z0-9_$]*)\./g)) {
    dataRoots.add(match[1]);
  }

  for (const match of text.matchAll(/@@for\s*\([^)]*<\s*([A-Za-z_$][A-Za-z0-9_$]*)\./g)) {
    dataRoots.add(match[1]);
  }

  return {
    variables: [...variables].sort(),
    dataRoots: [...dataRoots].sort(),
  };
}

function hasContract(text) {
  return /@partial\b/.test(text.slice(0, 1200));
}

function findCycles(graph) {
  const cycles = [];
  const visiting = new Set();
  const visited = new Set();
  const stack = [];

  function visit(node) {
    if (visiting.has(node)) {
      const start = stack.indexOf(node);
      if (start >= 0) cycles.push([...stack.slice(start), node]);
      return;
    }

    if (visited.has(node)) return;

    visiting.add(node);
    stack.push(node);

    for (const next of graph.get(node) || []) {
      visit(next);
    }

    stack.pop();
    visiting.delete(node);
    visited.add(node);
  }

  for (const node of graph.keys()) visit(node);
  return cycles;
}

const htmlFiles = walk(htmlRoot).filter((file) => file.endsWith('.html'));
const partialFiles = walk(partialRoot).filter((file) => file.endsWith('.html'));
const sourceFiles = [...htmlFiles, ...partialFiles];
const partialSet = new Set(partialFiles.map(rel));
const includeRows = [];
const partialStats = [];

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  const from = rel(file);
  const includePattern = /@@(include|loop)\(\s*(['"])([^'"]+)\2/g;

  for (const match of text.matchAll(includePattern)) {
    const target = resolveInclude(file, match[3]);
    includeRows.push({
      from,
      fromKind: from.startsWith('src/html/') ? 'html' : 'partial',
      type: match[1],
      rawTarget: match[3],
      target: rel(target),
      targetExists: fs.existsSync(target),
    });
  }
}

const incomingCounts = countBy(
  includeRows.filter((row) => row.targetExists),
  'target'
);
const outgoingCounts = countBy(includeRows, 'from');

for (const file of partialFiles) {
  const text = fs.readFileSync(file, 'utf8');
  const fileRel = rel(file);
  const vars = collectVariables(text);
  partialStats.push({
    file: fileRel,
    incoming: incomingCounts.get(fileRel) || 0,
    outgoing: outgoingCounts.get(fileRel) || 0,
    variableCount: vars.variables.length,
    variables: vars.variables,
    dataRoots: vars.dataRoots,
    hasContract: hasContract(text),
  });
}

const partialIncludeRows = includeRows.filter((row) => row.fromKind === 'partial');
const graph = new Map();
for (const row of partialIncludeRows) {
  if (!partialSet.has(row.from) || !partialSet.has(row.target)) continue;
  if (!graph.has(row.from)) graph.set(row.from, []);
  graph.get(row.from).push(row.target);
}

const cycles = findCycles(graph);
const missingRows = includeRows.filter((row) => !row.targetExists);
const topIncluded = sortCounts(incomingCounts).slice(0, 30);
const topOutgoing = sortCounts(outgoingCounts).slice(0, 30);
const topVariablePartials = [...partialStats]
  .sort((a, b) => b.variableCount - a.variableCount || b.incoming - a.incoming || a.file.localeCompare(b.file))
  .slice(0, 30);
const noContract = partialStats
  .filter((item) => item.variableCount > 0 && !item.hasContract)
  .sort((a, b) => b.incoming - a.incoming || b.variableCount - a.variableCount || a.file.localeCompare(b.file));
const orphanPartials = partialStats
  .filter((item) => item.incoming === 0)
  .sort((a, b) => b.variableCount - a.variableCount || a.file.localeCompare(b.file));

fs.mkdirSync(docsRoot, { recursive: true });

const mapMd = [
  '# Partial Map',
  '',
  '> Generated by `npm run audit:partials`. Do not edit counts by hand.',
  '',
  '## Summary',
  '',
  `- HTML pages: ${htmlFiles.length}`,
  `- Partial files: ${partialFiles.length}`,
  `- Include / loop calls: ${includeRows.length}`,
  `- HTML to partial calls: ${includeRows.filter((row) => row.fromKind === 'html').length}`,
  `- Partial to partial calls: ${partialIncludeRows.length}`,
  `- Partials with variables: ${partialStats.filter((item) => item.variableCount > 0).length}`,
  `- Partials with @partial contract: ${partialStats.filter((item) => item.hasContract).length}`,
  `- Missing include targets: ${missingRows.length}`,
  `- Partial include cycles: ${cycles.length}`,
  '',
  '## Top Included Partials',
  '',
  '| Count | Partial |',
  '| ---: | --- |',
  ...topIncluded.map((row) => `| ${row.count} | \`${mdEscape(row.name)}\` |`),
  '',
  '## Files With Most Include Calls',
  '',
  '| Count | File |',
  '| ---: | --- |',
  ...topOutgoing.map((row) => `| ${row.count} | \`${mdEscape(row.name)}\` |`),
  '',
  '## Partials With Most Variables',
  '',
  '| Variables | Incoming | Partial | Variable Names |',
  '| ---: | ---: | --- | --- |',
  ...topVariablePartials.map((item) => (
    `| ${item.variableCount} | ${item.incoming} | \`${mdEscape(item.file)}\` | ${mdEscape(item.variables.join(', '))} |`
  )),
  '',
  '## Missing Include Targets',
  '',
  missingRows.length
    ? ['| From | Type | Raw Target | Resolved Target |', '| --- | --- | --- | --- |',
      ...missingRows.map((row) => `| \`${mdEscape(row.from)}\` | ${row.type} | \`${mdEscape(row.rawTarget)}\` | \`${mdEscape(row.target)}\` |`)].join('\n')
    : 'None.',
  '',
  '## Partial Include Cycles',
  '',
  cycles.length
    ? cycles.map((cycle) => `- ${cycle.map((item) => `\`${mdEscape(item)}\``).join(' -> ')}`).join('\n')
    : 'None.',
  '',
  '## Variable Partials Missing Contract',
  '',
  noContract.length
    ? ['| Incoming | Variables | Partial |', '| ---: | ---: | --- |',
      ...noContract.slice(0, 80).map((item) => `| ${item.incoming} | ${item.variableCount} | \`${mdEscape(item.file)}\` |`)].join('\n')
    : 'None.',
  '',
  '## Orphan Partials',
  '',
  orphanPartials.length
    ? ['| Variables | Partial |', '| ---: | --- |',
      ...orphanPartials.map((item) => `| ${item.variableCount} | \`${mdEscape(item.file)}\` |`)].join('\n')
    : 'None.',
  '',
].join('\n');

const contractsMd = [
  '# Partial Contracts',
  '',
  '> Generated by `npm run audit:partials`. Add or update `@partial` comments in source partials, then regenerate this file.',
  '',
  '| Partial | Incoming | Includes | Variables | Data Roots | Has Contract |',
  '| --- | ---: | ---: | --- | --- | --- |',
  ...partialStats
    .sort((a, b) => b.incoming - a.incoming || b.variableCount - a.variableCount || a.file.localeCompare(b.file))
    .map((item) => (
      `| \`${mdEscape(item.file)}\` | ${item.incoming} | ${item.outgoing} | ${mdEscape(item.variables.join(', ')) || '-'} | ${mdEscape(item.dataRoots.join(', ')) || '-'} | ${item.hasContract ? 'yes' : 'no'} |`
    )),
  '',
].join('\n');

const usageCsv = [
  ['from', 'from_kind', 'type', 'raw_target', 'resolved_target', 'target_exists'].join(','),
  ...includeRows
    .sort((a, b) => a.from.localeCompare(b.from) || a.target.localeCompare(b.target))
    .map((row) => [
      row.from,
      row.fromKind,
      row.type,
      row.rawTarget,
      row.target,
      row.targetExists ? 'yes' : 'no',
    ].map(csvEscape).join(',')),
  '',
].join('\n');

fs.writeFileSync(path.join(docsRoot, 'partial-map.md'), mapMd);
fs.writeFileSync(path.join(docsRoot, 'partial-contracts.md'), contractsMd);
fs.writeFileSync(path.join(docsRoot, 'partial-usage.csv'), usageCsv);

console.log(`HTML pages: ${htmlFiles.length}`);
console.log(`Partial files: ${partialFiles.length}`);
console.log(`Include / loop calls: ${includeRows.length}`);
console.log(`Partial contracts: ${partialStats.filter((item) => item.hasContract).length}/${partialFiles.length}`);
console.log(`Missing include targets: ${missingRows.length}`);
console.log(`Partial include cycles: ${cycles.length}`);
console.log('Wrote docs/partial-map.md');
console.log('Wrote docs/partial-contracts.md');
console.log('Wrote docs/partial-usage.csv');
