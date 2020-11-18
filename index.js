const http = require('http');
const { mathToSvg } = require('@justforfun-click/mathjax/js/mathToSvg');

const listener = (req, res) => {
    var path = decodeURI(req.url);
    for (var i = 0; i < path.length; ++i) {
        if (path[i] != '/') {
            path = path.substr(i);
            break;
        }
    }
    var svgContent = mathToSvg(path);
    if (svgContent) {
        res.setHeader("Content-Type", "image/svg+xml");
        res.end(svgContent);
    } else {
        res.writeHead(404);
        res.end();
    }
};

const server = http.createServer(listener);
server.listen(process.env.PORT || 80)
