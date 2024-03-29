var width, height;
var container;
var W = 87, A = 65, S = 83, D = 68,
	UP = 38, LEFT = 37, DOWN = 40, RIGHT = 39,
	SHIFT = 16,
	NUM0 = 48, NUM1 = 49, NUM2 = 50, NUM3 = 51, NUM4 = 52, NUM5 = 53, NUM6 = 54, NUM7 = 55, NUM8 = 56, NUM9 = 57;

function init(w, h) {
	width = w;
	height = h;
	container = $('#container');
	container.width(width).height(height);
}

function start() {
	then = Date.now();
	setInterval(game, 1000 / 60);
	startGame();
}
var totalHeight = 0;
var count = -1;
function createCanvas(w, h, className, id) {
	count++;
	var canvas = document.createElement('canvas');
	var y = -totalHeight;
	totalHeight += h;
	canvas.width = w;
	canvas.height = h;
	canvas.className += className;
	canvas.setAttribute("id", id);
	canvas.style.zIndex = count + 50;
	canvas.style.top = y;
	container.append(canvas);
	return new Canvas(canvas, 0, y, w, h);
}

var Canvas = function(element, x, y, w, h) {
	this.element = element;
	this.$element = $(element);
	this.context = element.getContext('2d');
	this.pos = new Vector(x, y, w, h);
	this.yOffs = y;

	this.move = function(x, y) {
		this.$element.css('left', (this.pos.x = x) + 'px');
		this.$element.css('top', (this.pos.y = y + this.yOffs) + 'px');
	}
}

var then;
function game() {
	var now = Date.now();
	var delta = now - then;
	$('#fps').text(Math.floor(1000 / delta));

	update(delta / 1000);
	render();

	then = now;
};

function debug(text) {
	$('#debug').text(text);
}

var keyboard = [];
$(document).keydown(function(evt) { keyboard[evt.keyCode] = true; })
	.keyup(function(evt) { keyboard[evt.keyCode] = false; });

var mousedown = false;
$(document).mousedown(function() { mousedown = true; })
	.mouseup(function() { mousedown = false; });

var mouse = new Vector(0,0,0,0);
$(document).mousemove(function(e) {
	mouse.x = (e.layerX || e.layerX == 0) ? e.layerX : e.offsetX;
	mouse.y = level.height - (e.layerX ? e.layerY : e.offsetY);
});

function keyDown(key) {
	return keyboard[key];
}

function keyUp(key) {
	return !keyboard[key];
}

function circle(ctx, x, y, r, c) {
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function rect(ctx, x, y, w, h, c) {
	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.closePath();
	ctx.fill();
}

function clear(ctx, x, y, w, h) {
	ctx.clearRect(x,y,w,h);
}

function clear(ctx) {
	ctx.clearRect(0, 0, width, height);
}

function randomInt(maxValue) {
	return Math.floor(Math.random() * (maxValue + 1));
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function alphaColor(r, g, b, a) {
	return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

function Vector(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.copy = function() {
		return new Vector(this.x, this.y, this.w, this.h);
	}

	this.distSqrt = function(to) {
		var xd = this.x - to.x;
		var yd = this.y - to.y;
		return xd * xd + yd * yd;
	}

	this.dist = function(pos) {
		return Math.sqrt(this.distSqrt(pos));
	}

	this.toString = function() {
		return this.x + ', ' + this.y;
	}
}