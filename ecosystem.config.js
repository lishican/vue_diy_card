module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "nodeAdmin",
      script: "./bin/www",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      exec_mode: "fork",
      ignore_watch: ["./logs/*", "./dashbord/*", "./app/web/*"],
      env: {
        NODE_ENV: "production",
        PORT: "8500"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
