module.exports = {
  apps: [{
    name: 'tedximtparis',
    script: 'node_modules/.bin/next',
    args: 'start -p 3001',
    cwd: '/home/csfeir/Documents/TEDX/TEDXXEULIST',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    error_file: '/var/log/tedximtparis/error.log',
    out_file: '/var/log/tedximtparis/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }],
};
