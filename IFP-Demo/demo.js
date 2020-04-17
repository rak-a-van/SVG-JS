var isDraw = false;
var isLine = false;
var xC = 0;
var yC = 0;
var element = null;
var isLineClicked = false;
var flipvalue = 1;
var zoom = 1;
function mouseMove(event) {
    var x = event.x;
    var y = event.y;
    if (xC !== 0) {
        lineDraw(xC, yC, x, y);
    }
    if (isDraw) {
        xC = x;
        yC = y;
    }

}

function draw() {
    isDraw = !isDraw;
    isLine = false;
    if (isDraw) {
        xC = 0;
        yC = 0;
    }
}

function line() {
    isDraw = false;
    isLine = !isLine;
    xC = 0;
    yC = 0;
}

function lineClick(event) {
    isLineClicked = !isLineClicked;
    console.log('line');
    element = null;
    if (isLine) {
        var x = event.x;
        var y = event.y;
        if (xC !== 0) {
            lineDraw(xC, yC, x, y);
        }
        xC = x;
        yC = y;
        if (!isLineClicked) {
            xC = 0;
            yC = 0;
        }
    }
}


var lineDraw = function (ax, ay, bx, by) {
    if (isLineClicked) {
        console.log('draw');
        if (isLine && element) {
            element.remove();
        }
        if (ax > bx) {
            bx = ax + bx;
            ax = bx - ax;
            bx = bx - ax;

            by = ay + by;
            ay = by - ay;
            by = by - ay;
        }

        let distance = Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
        let calc = Math.atan((by - ay) / (bx - ax));
        let degree = calc * 180 / Math.PI;

        let line = document.createElement('div');
        line.style['position'] = 'absolute';
        line.style['height'] = '1px';
        line.style['transformOrigin'] = 'top left';
        line.style['width'] = distance;
        line.style['top'] = ay + 'px';
        line.style['left'] = ax + 'px';
        line.style['transform'] = `rotate(${degree}deg)`;
        line.style['background-color'] = 'black';
        element = document.getElementById('container').appendChild(line);
    }
}

function flip() {
    flipvalue = flipvalue * -1;
    document.getElementById('container').style['-webkit-transform'] = 'scaleX(' + flipvalue + ')';
    document.getElementById('container').style['transform'] = 'scaleX(' + flipvalue + ');';
}

function zoomIn() {
    zoom += 0.25;
    setZoom(zoom, document.getElementById('container'));
}

function zoomOut() {
    zoom -= 0.25;
    setZoom(zoom, document.getElementById('container'));
}

function setZoom(zoom, el) {

    var transformOrigin = [0, 0];
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