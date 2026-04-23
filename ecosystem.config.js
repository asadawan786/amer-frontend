module.exports = {
  apps: [
    {
      name: "amer-frontend",
      cwd: "/www/wwwroot/amer",
      script: "node_modules/.bin/next",
      args: "start -p 3091",
      env: {
        NODE_ENV: "production",
        PORT: 3091,
      },
      max_memory_restart: "512M",
      restart_delay: 3000,
      max_restarts: 10,
    },
    {
      name: "amer-backend",
      cwd: "/www/wwwroot/amer/amer-backend",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      max_memory_restart: "256M",
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
