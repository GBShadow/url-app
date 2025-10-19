import { Worker } from "cluster";

import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master PID: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: Worker) => {
    console.log(`Worker ${worker.process.pid} morreu. Reiniciando...`);
    cluster.fork();
  });
} else {
  require("./server");
}
