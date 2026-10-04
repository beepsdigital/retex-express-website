// Minimal static preview server for dist/ (no dependencies).
// Usage: node serve.js [port]   → http://localhost:8080/
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const port = Number(process.argv[2]) || 8080;
// Mirror production: when siteUrl has a path (GitHub Pages project site), serve dist/ under that prefix.
const BASE = new URL(require('./site.config.js').siteUrl).pathname.replace(/\/+$/, '');
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

function send(res, status, file) {
  const ext = path.extname(file).toLowerCase();
  res.writeHead(status, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split('?')[0]); } catch (e) { res.writeHead(400); return res.end('Bad request'); }
  if (BASE) {
    if (urlPath === BASE) { res.writeHead(301, { Location: BASE + '/' }); return res.end(); }
    if (!urlPath.startsWith(BASE + '/')) { res.writeHead(302, { Location: BASE + '/' }); return res.end(); }
    urlPath = urlPath.slice(BASE.length);
  }
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.normalize(path.join(root, urlPath));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, st) => {
    if (!err && st.isFile()) return send(res, 200, file);
    if (!err && st.isDirectory()) { res.writeHead(301, { Location: BASE + urlPath + '/' }); return res.end(); }
    const nf = urlPath.startsWith('/ar/') ? path.join(root, 'ar', '404.html') : path.join(root, '404.html');
    if (fs.existsSync(nf)) return send(res, 404, nf);
    res.writeHead(404); res.end('Not found');
  });
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}${BASE}/`));
