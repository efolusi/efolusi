const isDev = process.env.EFOLUSI_DEPLOY_ENVIRONMENT === "dev";
const environment = isDev ? "dev" : "prod";
const port = isDev ? "13000" : "3000";
const externalOrigin = isDev ? "https://dev-efolusi.efolusi.com" : "https://efolusi.com";

module.exports = {
  apps: [
        {
          name: `efolusi-${environment}-efolusi-web`,
          cwd: `/home/deploy/efolusi-${environment}/efolusi`,
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
            EFOLUSI_EXTERNAL_ORIGIN: externalOrigin,
          },
          output: `/home/deploy/logs/efolusi-${environment}-efolusi-web.out.log`,
          error: `/home/deploy/logs/efolusi-${environment}-efolusi-web.err.log`,
          merge_logs: true,
          time: true,
        },
      ],
};
