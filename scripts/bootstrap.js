const { ensureUserEnvLocal, run } = require('./_helpers');

async function main() {
  ensureUserEnvLocal();
  await run('npm', ['install', '--workspaces', '--include-workspace-root']);
}

main().catch((error) => {
  console.error(`[bootstrap] ${error.message}`);
  process.exit(1);
});
