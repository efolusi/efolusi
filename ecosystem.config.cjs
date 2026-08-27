const isDev = process.env.EFOLUSI_DEPLOY_ENVIRONMENT === "dev";

module.exports = {
  apps: isDev
    ? [
        {
          name: "efolusi-dev-efolusi-web",
          cwd: "/home/deploy/efolusi-dev/efolusi",
          script: "node_modules/next/dist/bin/next",
          args: "start -H 127.0.0.1 -p 13000",
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
            PORT: "13000",
          },
          output: "/home/deploy/logs/efolusi-dev-efolusi-web.out.log",
          error: "/home/deploy/logs/efolusi-dev-efolusi-web.err.log",
          merge_logs: true,
          time: true,
        },
      ]
    : [],
};
