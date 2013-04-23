var LEVEL_CANVAS = 0, ENTITY_CANVAS = 1;
var canvases = [], level;
function startGame() {
	init(window.innerWidth, window.innerHeight);
	var levelWidth = Art.background.width;
	var levelHeight = Art.background.height;
	level = new Level(levelWidth, levelHeight);
	canvases.push(createCanvas(levelWidth, levelHeight, 'gameCanvas', 'levelCanvas'));
	canvases.push(createCanvas(levelWidth, levelHeight, 'gameCanvas', 'terrainCanvas'));
	canvases.push(createCanvas(width, height, 'gameCanvas', 'entityCanvas'));
	level.prepare(canvases[0], canvases[1], canvases[2]);
}

function update(delta) {
	level.update(delta);
};

function render() {
	level.render(canvases);
};