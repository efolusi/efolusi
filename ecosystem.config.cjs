const path = require("node:path");

const cwd = __dirname;
const environment = cwd.includes(`${path.sep}efolusi-dev${path.sep}`) ? "dev" : "prod";
const port = environment === "dev" ? "13000" : "3000";

module.exports = {
  apps: [
        {
          name: `efolusi-${environment}-efolusi-web`,
          cwd,
          script: "node_modules/next/dist/bin/next",
          args: `start -H 127.0.0.1 -p ${port}`,
          instances: 1,
          exec_mode: "fork",
          autorestart: true,
          watch: false,
          max_memory_restart: "512M",
          kill_timeout: 10000,
          listen_timeout: 10000,
          env: {
            NODE_ENV: "production",
            HOSTNAME: "127.0.0.1",
            PORT: port,
          },
          output: `/home/deploy/logs/efolusi-${environment}-efolusi-web.out.log`,
          error: `/home/deploy/logs/efolusi-${environment}-efolusi-web.err.log`,
          merge_logs: true,
          time: true,
        },
      ],
};
