var width = window.innerWidth;
var height = window.innerHeight - 25;
var flipvalue = 1;
// first we need Konva core things: stage and layer
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var isPaint = false;
var mode = 'brush';
var lastLine;

stage.on('mousedown touchstart', function (e) {
    isPaint = true;
    var width = document.getElementById('container').offsetWidth;
    var pos = stage.getPointerPosition();
    var xPos = flipvalue == 1 ? pos.x : width - pos.x;
    lastLine = new Konva.Line({
        stroke: '#df4b26',
        strokeWidth: 5,
        globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
        points: [xPos, pos.y],
        draggable: true,
    });
    layer.add(lastLine);
});

stage.on('mouseup touchend', function () {
    isPaint = false;
    var width = document.getElementById('container').offsetWidth;
    var pos = stage.getPointerPosition();
    var xPos = flipvalue == 1 ? pos.x : width - pos.x;
    var newPoints = lastLine.points().concat([xPos, pos.y]);
    lastLine.points(newPoints);
    layer.batchDraw();
});

// and core function - drawing
stage.on('mousemove touchmove', function () {
    if (!isPaint) {
        return;
    }


});

var select = document.getElementById('tool');
select.addEventListener('change', function () {
    mode = select.value;
});

function flip() {
    flipvalue = flipvalue * -1;
    document.getElementById('container').style['-webkit-transform'] = 'scaleX(' + flipvalue + ')';
    document.getElementById('container').style['transform'] = 'scaleX(' + flipvalue + ');';
}