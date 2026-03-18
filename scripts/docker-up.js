const { ensureUserEnvLocal, run } = require('./_helpers');

async function main() {
  ensureUserEnvLocal();
  await run('docker', ['compose', 'up', '--build']);
}

main().catch((error) => {
  console.error(`[docker:up] ${error.message}`);
  process.exit(1);
});
