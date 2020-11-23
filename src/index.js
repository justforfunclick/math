const http = require('http');
const https = require('https');
const mime = require('mime-types');
const Path = require('path');
const fs = require('fs');
const { mathToSvg } = require('@justforfun-click/mathjax/js/mathToSvg');

const listener = (req, res) => {
    var path = decodeURIComponent(req.url);
    var i = 0;
    for (; i < path.length; ++i) {
        if (path[i] != '/') {
            break;
        }
    }
    path = path.substr(i);
    var svgContent = mathToSvg(path);
    if (svgContent) {
        res.setHeader("Content-Type", "image/svg+xml");
        res.end(svgContent);
    } else {
        if (!path) {
            path = "index.html";
        }
        path = Path.join(__dirname, 'static_files', path);
        fs.readFile(path, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
            } else {
                res.setHeader("Content-Type", mime.lookup(path));
                res.end(data);
            }
        });
    }
};

var server = http.createServer(listener);
var port = process.env.PORT || 80;
server.listen(port);
console.log(`http server is listening at ${port}`);

if (fs.existsSync(`${__dirname}/public.key`) && fs.existsSync(`${__dirname}/private.key`)) {
    server = https.createServer({
        cert: fs.readFileSync(`${__dirname}/public.key`),
        key: fs.readFileSync(`${__dirname}/private.key`)
    },listener);
    port = process.env.SSLPORT || 443;
    server.listen(port);
    console.log(`https server is listening at ${port}`);
}
