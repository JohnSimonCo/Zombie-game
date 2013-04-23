var gridSize = 10;
var Terrain = Class.extend({
	init: function(x, y, w, h) {
		this.gridPos = Vector(x, y, w, h);
		this.pos = new Vector(x * gridSize, y * gridSize, w * gridSize, h * gridSize);
	},
	update: function(level, delta) {
	},
	render: function(ctx, level) {
		rect(ctx, this.pos.x - this.pos.w / 2, level.height - this.pos.y - this.pos.h / 2, this.pos.w, this.pos.h, '#fff');
	},
	getBB: function() {
		return new BB(this, this.pos.x - this.pos.w / 2 , this.pos.y - this.pos.h / 2, this.pos.x + this.pos.w / 2 , this.pos.y + this.pos.h / 2);
	},
	collide: function(other) {

	},
	hurt: function() {
		
	}
});