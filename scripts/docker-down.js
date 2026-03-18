const { run } = require('./_helpers');

async function main() {
  await run('docker', ['compose', 'down', '--remove-orphans']);
}

main().catch((error) => {
  console.error(`[docker:down] ${error.message}`);
  process.exit(1);
});
