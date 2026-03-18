const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');

function resolveCommand(command) {
  if (process.platform !== 'win32') {
    return command;
  }

  if (command === 'npm' || command === 'npx') {
    return `${command}.cmd`;
  }

  return command;
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(resolveCommand(command), args, {
      cwd: repoRoot,
      stdio: 'inherit',
      ...options,
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

function ensureEnvFile(examplePath, targetPath) {
  if (fs.existsSync(targetPath)) {
    return false;
  }

  fs.copyFileSync(examplePath, targetPath);
  return true;
}

function ensureUserEnvLocal() {
  const examplePath = path.join(repoRoot, 'services', 'user-service', '.env.example');
  const targetPath = path.join(repoRoot, 'services', 'user-service', '.env.local');

  if (!fs.existsSync(examplePath)) {
    throw new Error(`Missing env template: ${examplePath}`);
  }

  const created = ensureEnvFile(examplePath, targetPath);
  if (created) {
    console.log('[scripts] Created services/user-service/.env.local from .env.example');
  }
}

module.exports = {
  ensureEnvFile,
  ensureUserEnvLocal,
  repoRoot,
  run,
};
