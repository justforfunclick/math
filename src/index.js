const mathJaxPackage = "@justforfun-click/mathjax"
const { mathjax } = require(`${mathJaxPackage}/js/mathjax`);
const { AsciiMath } = require(`${mathJaxPackage}/js/input/asciimath`);
const { SVG } = require(`${mathJaxPackage}/js/output/svg`);
const { RegisterHTMLHandler } = require(`${mathJaxPackage}/js/handlers/html`);
const { liteAdaptor } = require(`${mathJaxPackage}/js/adaptors/liteAdaptor`);

const adaptor = liteAdaptor();
const handler = RegisterHTMLHandler(adaptor);
const ascii = new AsciiMath();
const svg = new SVG();
const html = mathjax.document('', {InputJax: ascii, OutputJax: svg});

module.exports = async function(context, trigger, input, outputInput) {
    var path = (context.req.params['path'] || 'index.html').replace(/\s+/g, ' ');
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
