module.exports = {
  apps: [{
    name: 'lime-example',
    script: 'app.js',
    cwd: __dirname,

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      DATABASE_USER: 'test',
      DATABASE_PASS: 'test'
    },
    env_production: {
      NODE_ENV: 'production',
      DATABASE_USER: 'test_prod',
      DATABASE_PASS: 'test_prod'
    }
  }],

  deploy: {
    production: {
      user: 'node',
      host: 'cvm.cuiyongjian.com',
      ref: 'origin/demo',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
