var svgElement = null;
var draw = null;
function xmlToString(xmlData) {

    var xmlString;
    //IE
    if (window.ActiveXObject) {
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else {
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}

$.get("Plan.xml", function (svg) {
    var xml = xmlToString(svg);
    draw = SVG('#drawing');
    svgElement = draw.svg(xml);
});

function flip(){
    document.getElementById('svg-100').flip('x')
}