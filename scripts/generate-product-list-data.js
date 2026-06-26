#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sourcePath = path.join(root, 'src', 'data', 'products', 'demo-products.json');
const outputPath = path.join(root, 'src', 'partial', 'shared', 'sections', '_products-list.data.html');

const products = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const encodedProducts = Buffer.from(JSON.stringify(products)).toString('base64');
const output = [
  '<!--',
  '@partial shared/sections/_products-list.data',
  '@generated scripts/generate-product-list-data.js',
  '@source src/data/products/demo-products.json',
  '@note Generated demo product data for shared/sections/_products-list. Do not edit by hand.',
  '-->',
  "@@for (var products = JSON.parse(Buffer.from('" + encodedProducts + "', 'base64').toString('utf8')), limit = Math.min(Number(context.item || 0), products.length), i = 0; i < limit; i++) {",
  "    @@include('../ui/_product-list-item.html', `+JSON.stringify((function () {",
  '        var data = Object.assign({}, products[i]);',
  '',
  "        if (context.rowStyle == 'grid' || context.rowStyle == 'rwd') {",
  "            data.col = '6';",
  "            data.colMd = context.colMd || '3';",
  '        }',
  '',
  "        if (context.rowStyle == 'hs' || context.rowStyle == 'hs-4' || context.rowStyle == 'hs-6') {",
  "            data.col = '8';",
  "            data.colMd = '5';",
  "            data.colLg = '3';",
  '        }',
  '',
  "        if (context.rowStyle == 'filter') {",
  "            data.col = '6';",
  "            data.colLg = context.colLg || '4';",
  '        }',
  '',
  '        if (context.badgeRank) {',
  '            data.badgeRank = String(products.length - i);',
  '        }',
  '',
  '        if (!context.badge1Title) {',
  '            delete data.badge1Color;',
  '            delete data.badge1Title;',
  '        }',
  '',
  '        return data;',
  '    })())+`)',
  '}',
  '',
].join('\n');

fs.writeFileSync(outputPath, output);
console.log(`Generated ${path.relative(root, outputPath)} from ${products.length} demo products.`);
