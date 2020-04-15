var svgElement = null;
var draw = null;
var scaleX = 1;
var zoomValue = 0;
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

// $.get("Plan.xml", function (svg) {
//     var xml = xmlToString(svg);
//     draw = SVG('#drawing');
//     svgElement = draw.svg(xml);
// });

function flip() {
    for (var i = 0; i < 3; i++) {
        var floorElement = document.getElementById(i);
        scaleX = scaleX * -1;
        var scaleY = 1;
        floorElement.style['-webkit-transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
        floorElement.style['-moz-transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
        floorElement.style['-ms-transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
        floorElement.style['-o-transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
        floorElement.style['transform'] = 'scale(' + scaleX + ',' + scaleY + ')';
        var $textGroups = floorElement.querySelectorAll('g[id^=Text]');
        var $dimGroups = floorElement.querySelectorAll('g[id^=Dim]');
        $textGroups.forEach((ele) => {
            var $this = ele;
            try {
                var element = ele.getBBox();
                var svgWidth = floorElement.offsetWidth;
                var translateX = (((element.x) - (svgWidth / 2)) * 2) + svgWidth + element.width;
                if (translateX !== 0) {
                    translateX = Math.round(translateX * 100) / 100;
                }
                translateX = scaleX == -1 ? translateX : 0;
                var translateY = 0;
                $this.setAttribute('transform', 'translate(' + translateX + ', ' + translateY + ') scale(' + -1 + ',' + 1 + ')');
            }
            catch (err) { }
        });
        $dimGroups.forEach((ele) => {
            var $this = ele;
            try {
                var element = ele.getBBox();
                var svgWidth = floorElement.offsetWidth;
                var translateX = (((element.x) - (svgWidth / 2)) * 2) + svgWidth + element.width;
                if (translateX !== 0) {
                    translateX = Math.round(translateX * 100) / 100;
                }
                translateX = scaleX == -1 ? translateX : 0;
                var translateY = 0;
                $this.setAttribute('transform', 'translate(' + translateX + ', ' + translateY + ') scale(' + -1 + ',' + 1 + ')');
            }
            catch (err) { }
        });
    }
}

function zoomIn() {
    zoomValue += 1;
    for (var i = 0; i < 3; i++) {
        var floorElement = document.getElementById(i);
        setZoom(zoomValue, floorElement);
    }
}

function zoomOut() {
    zoomValue -= 1;
    for (var i = 0; i < 3; i++) {
        var floorElement = document.getElementById(i);
        setZoom(zoomValue, floorElement);
    }
}

function setZoom(zoom, el) {

    transformOrigin = [0, 0];
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;

}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dynamicDiv = document.createElement('div');
            dynamicDiv.innerHTML = this.responseText;
            var svg1 = dynamicDiv.querySelector('svg');
            for (var i = 0; i < 3; i++) {
                var stageId = '_x3' + i + '_';
                var floorElement = document.getElementById(i);
                floorElement.innerHTML = "<svg id='svg-" + i + "'></svg>";
                var svgElement = document.getElementById('svg-' + i);
                cloneAttributes(svgElement, svg1);

                dynamicDiv.querySelectorAll('g[id*=_x3]').forEach((element, j) => {
                    if (element.id != undefined && element.id.indexOf(stageId) > -1) {
                        var elementId = element.id.substr(0, 5);
                        if (elementId == stageId) {
                            svgElement.append(element);
                        }
                    }
                });
            }
            dynamicDiv.remove();
        }
    };
    xhttp.open("GET", "Plan.xml", true);
    xhttp.send();
}


function cloneAttributes(element, sourceNode) {
    let attr;
    let attributes = Array.prototype.slice.call(sourceNode.attributes);
    while (attr = attributes.pop()) {
        element.setAttribute(attr.nodeName, attr.nodeValue);
    }
}
loadDoc();

