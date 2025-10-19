import cluster, { Worker } from 'cluster';

import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master PID: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker: Worker) => {
    console.log(`Worker ${worker.process.pid} dead. reboot...`);
    cluster.fork();
  });
} else {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./server');
}
