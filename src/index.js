const { mathjax } = require('mathjax-full/js/mathjax');
const { AsciiMath } = require('mathjax-full/js/input/asciimath');
const { SVG } = require('mathjax-full/js/output/svg');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor');

const adaptor = liteAdaptor();
const handler = RegisterHTMLHandler(adaptor);
const ascii = new AsciiMath();
const svg = new SVG();
const html = mathjax.document('', {InputJax: ascii, OutputJax: svg});

module.exports = async function(context, trigger, input, outputInput) {
    var path = decodeURI(context.req.params['path'] || 'index.html').replace(/\s+/g, '');
    if (path.startsWith('$/')) {
        var svgContent = adaptor.innerHTML(html.convert(path.substr(2)));
        context.res = {
            headers: {
                'Content-Type': 'image/svg+xml'
            },
            body: svgContent
        };
    } else {
        context.res = {
            status: 404
        };
    }
}
