// PM2 process definitions — the source of truth for hosted apps and their ports.
//
//   pm2 start ecosystem.config.js   # start/refresh every app below
//   pm2 save                        # persist so it survives daemon restarts
//   pm2 startup                     # (one-time, needs sudo) auto-start on boot
//
// To add an app: append an entry here with a UNIQUE port, update PORTS.md,
// then `pm2 start ecosystem.config.js && pm2 save`. Keep this file and PORTS.md
// in lockstep so port assignments never collide.
module.exports = {
  apps: [
    {
      name: 'ai-eng-dashboard',
      script: 'server.js',     // serves the dashboard + /api/pm2 status endpoint
      cwd: __dirname,
      autorestart: true,
      max_restarts: 10,
      env: { PORT: '9999' },
    },
  ],
};
