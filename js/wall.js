function Wall(x,y){
	this.spriteSheetRef = "img/paddle.png";

	this.type = WALL;

	this.x = x;
	this.y = y;
	this.viewWidth = GAMEWIDTH;
	this.viewHeight = 64;
	this.viewable = false;
	
	this.collidable = true;
	this.collisionWidth = this.viewWidth;
	this.collisionHeight = this.viewHeight;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
}

Wall.prototype = Object.create(Entity.prototype);
