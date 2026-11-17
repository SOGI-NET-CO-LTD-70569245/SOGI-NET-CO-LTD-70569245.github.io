#!/usr/bin/env node
// 用 Node 16.18.0 執行 gulp，不需切換全域 Node 版本。
// 用法：npm run gulp -- <task>   例：npm run gulp -- build
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VERSION = '16.18.0';
const gulpBin = path.join(__dirname, '..', 'node_modules', 'gulp', 'bin', 'gulp.js');
const args = [gulpBin, ...process.argv.slice(2)];
const env = process.env;

function run(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, { stdio: 'inherit', ...opts });
  if (r.error) { console.error(r.error.message); process.exit(1); }
  process.exit(r.status === null ? 1 : r.status);
}

// 1. 目前就是 16.18.0
if (process.version === 'v' + VERSION) run(process.execPath, args);

// 2. 找已安裝的 Node 16（nvm-windows / nvm / fnm / Volta）
const home = env.USERPROFILE || env.HOME || '';
const candidates = [
  env.NVM_HOME && path.join(env.NVM_HOME, 'v' + VERSION, 'node.exe'),
  env.NVM_DIR && path.join(env.NVM_DIR, 'versions', 'node', 'v' + VERSION, 'bin', 'node'),
  env.FNM_DIR && path.join(env.FNM_DIR, 'node-versions', 'v' + VERSION, 'installation', 'node.exe'),
  env.FNM_DIR && path.join(env.FNM_DIR, 'node-versions', 'v' + VERSION, 'installation', 'bin', 'node'),
  env.APPDATA && path.join(env.APPDATA, 'nvm', 'v' + VERSION, 'node.exe'),
  env.APPDATA && path.join(env.APPDATA, 'fnm', 'node-versions', 'v' + VERSION, 'installation', 'node.exe'),
  env.LOCALAPPDATA && path.join(env.LOCALAPPDATA, 'Volta', 'tools', 'image', 'node', VERSION, 'node.exe'),
  home && path.join(home, '.nvm', 'versions', 'node', 'v' + VERSION, 'bin', 'node'),
].filter(Boolean);

const found = candidates.find((p) => fs.existsSync(p));
if (found) run(found, args);

// 3. 都找不到就用 npx 下載 Node 16 執行（第一次較慢，之後有快取）
console.log(`[gulp16] 找不到本機 Node ${VERSION}，改用 npx node@${VERSION} 執行…`);
run('npx', ['-y', 'node@' + VERSION, ...args.map((a) => JSON.stringify(a))], { shell: true });
