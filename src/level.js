var Level = Class.extend({
	init: function(w, h) {
		this.width = w;
		this.height = h;
		this.entities = [];
		this.terrains = [];
	},
	prepare: function(levelCanvas, terrainCanvas, entityCanvas) {
		this.levelCanvas = levelCanvas;
		this.terrainCanvas =  terrainCanvas;
		this.entityCanvas =  entityCanvas;
		this.xScroll = (width - this.width) / 2;
		this.yScroll = (height - this.height) / 2;
		this.levelCanvas.move(this.xScroll, this.yScroll);
		this.terrainCanvas.move(this.xScroll, this.yScroll);
		this.player = this.addEntity(new Player(this.width / 2, this.height / 2));

		var amount = 3;
		var distance = 500;
		for(var i = 0; i < amount; i ++) {
			var angle = i * ((Math.PI * 2) / amount);
			this.addEntity(new HostileMob(this.player.pos.x + Math.cos(angle) * distance, this.player.pos.y + Math.sin(angle) * distance));
		}

		this.addEntity(new Entity(this.width / 2, this.height, this.width, 0, TEAM_NEUTRAL));
		this.addEntity(new Entity(this.width, this.height / 2, 0, this.height, TEAM_NEUTRAL));
		this.addEntity(new Entity(this.width / 2, 0, this.width, 0, TEAM_NEUTRAL));
		this.addEntity(new Entity(0, this.height / 2, 0, this.height, TEAM_NEUTRAL));

		this.levelCanvas.context.drawImage(Art.background, 0, 0);
		this.addTerrain(new Terrain((this.width / 2) / gridSize, (this.height / 2) / gridSize, 5, 5));
		this.addTerrain(new Terrain((this.width / 2) / gridSize + 6, (this.height / 2) / gridSize + 6, 5, 5));
		this.addTerrain(new Terrain((this.width / 2) / gridSize - 6, (this.height / 2) / gridSize - 6, 5, 5));
		this.addTerrain(new Terrain((this.width / 2) / gridSize + 6, (this.height / 2) / gridSize - 6, 5, 5));
		this.addTerrain(new Terrain((this.width / 2) / gridSize - 6, (this.height / 2) / gridSize + 6, 5, 5));
	},
	addTerrain: function(terrain) {
		this.terrains.push(terrain);
		return terrain;
	},
	removeTerrain: function(index) {
		this.terrains.splice(index, 1);
	},
	addEntity: function(entity) {
		this.entities.push(entity);
		return entity;
	},
	getEntities: function() {
		return this.entities;
	},
	removeEntity: function(index) {
		this.entities.splice(index, 1);
	},
	getClipBBs: function(e) {
		var result = [];
		for(var index in this.entities) {
			var ee = this.entities[index];
			if (ee != e && ee.collidesWith(e))
				result.push(ee.getBB());
		}
		for(var index in this.terrains) {
			result.push(this.terrains[index].getBB());
		}
		return result;
	},
	update: function(delta) {
		var remove = [];
		for(var i in this.entities) {
			var entity = this.entities[i];
			if(entity.removed) { remove.push(i); continue; }
			entity.update(this, delta);
		};

		for(var i in remove) {
			this.removeEntity(remove[i]);
		};

		for(var i in this.terrains) {
			this.terrains[i].update(this, delta);
		}
	},
	scroll: function(xa, ya) {
		this.xScroll += xa;
		this.yScroll += ya;
		if(this.xScroll > 0)
			this.xScroll = 0;
		if(this.xScroll < width - this.width)
			this.xScroll = width - this.width;
		if(this.yScroll > 0)
			this.yScroll = 0;
		if(this.yScroll < height - this.height)
			this.yScroll = height - this.height;
		this.levelCanvas.move(this.xScroll, this.yScroll);
		this.terrainCanvas.move(this.xScroll, this.yScroll);
	},
	render: function() {
		clear(this.entityCanvas.context);
		for (var i in this.entities) {
			this.entities[i].render(this.entityCanvas.context, this);
		}

		for(var i in this.terrains) {
			this.terrains[i].render(this.terrainCanvas.context, this);
		}
	}
});