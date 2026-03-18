const { ensureUserEnvLocal, run } = require('./_helpers');

async function main() {
  ensureUserEnvLocal();
  await run('docker', ['compose', 'up', '-d', 'user-db']);
  await run('npm', ['run', 'start', '--workspace=user-service'], {
    env: {
      ...process.env,
      SERVICE_NAME: process.env.SERVICE_NAME || 'user-service',
      PORT: process.env.PORT || '3000',
      LOG_LEVEL: process.env.LOG_LEVEL || 'info',
      MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/userdb',
    },
  });
}

main().catch((error) => {
  console.error(`[dev] ${error.message}`);
  process.exit(1);
});
