const { mathToSvg } = require('@justforfun-click/mathjax/js/mathToSvg');

module.exports = async function(context, trigger, input, outputInput) {
    var svgContent = mathToSvg(context.req.params['path']);
    if (svgContent) {
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
