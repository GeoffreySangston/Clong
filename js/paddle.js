function Paddle(x,y){
	this.spriteSheetRef = "img/paddle.png";

	this.type = PADDLE;

	this.x = x;
	this.y = y;
	this.viewWidth = 16;
	this.viewHeight = 64;
	this.viewable = true;
	
	this.collidable = true;
	this.collisionWidth = this.viewWidth;
	this.collisionHeight = this.viewHeight;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
	this.speed = 3;
}

Paddle.prototype = Object.create(Entity.prototype);

Paddle.prototype.resetPosition = function(){
	this.y = GAMEWIDTH/2 - this.viewHeight/2;
};

Paddle.prototype.moveDown = function(){
	var nextY = this.y + this.speed;
	if(nextY + this.viewHeight <= GAMEHEIGHT){
		this.y = nextY;
	}
};

Paddle.prototype.moveUp = function(){
	var nextY = this.y - this.speed;
	if(nextY >= 0){
		this.y = nextY;
	}
};