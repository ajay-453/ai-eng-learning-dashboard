// Minimal dependency-free server: serves the dashboard and exposes live PM2
// process data at /api/pm2 so the UI can show what PM2 is hosting.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = process.env.PORT || 9999;
const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
};

function pm2Json(cb) {
  exec('pm2 jlist', { maxBuffer: 8 * 1024 * 1024 }, (err, stdout) => {
    if (err) return cb(err);
    try {
      const apps = JSON.parse(stdout).map((p) => ({
        name: p.name,
        status: p.pm2_env.status,
        port: (p.pm2_env.env && p.pm2_env.env.PORT) || null,
        uptime: p.pm2_env.pm_uptime || null,
        restarts: p.pm2_env.restart_time || 0,
        cpu: p.monit ? p.monit.cpu : null,
        memory: p.monit ? p.monit.memory : null,
        pid: p.pid || null,
      }));
      cb(null, apps);
    } catch (e) { cb(e); }
  });
}

http.createServer((req, res) => {
  if (req.url.split('?')[0] === '/api/pm2') {
    return pm2Json((err, apps) => {
      res.setHeader('Content-Type', 'application/json');
      if (err) { res.writeHead(500); return res.end(JSON.stringify({ error: String(err) })); }
      res.writeHead(200);
      res.end(JSON.stringify(apps));
    });
  }
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, path.normalize(urlPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream');
    res.writeHead(200);
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`dashboard + PM2 API on :${PORT}`));
