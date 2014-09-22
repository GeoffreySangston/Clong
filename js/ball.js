function Ball(x,y){
	this.spriteSheetRef = "img/paddle.png";

	this.type = BALL;

	this.x = x;
	this.y = y;
	this.viewWidth = 8;
	this.viewHeight = 8;
	this.viewable = true;
	
	this.collidable = true;
	this.collisionWidth = this.viewWidth;
	this.collisionHeight = this.viewHeight;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
	
	this.speed = 5;
	this.xVel = 0;
	this.yVel = 0;
}

Ball.prototype = Object.create(Entity.prototype);

Ball.prototype.resetPosition = function(){
	this.setCenter(GAMEWIDTH/2, GAMEHEIGHT/2);
	var theta = (Math.PI/4)*Math.random() - Math.PI/8;
	if(Math.random() < .5){
		theta += Math.PI;
	}
	this.xVel = this.speed * Math.cos(theta);
	this.yVel = this.speed * Math.sin(theta);
};



Ball.prototype.updateCollision = function(oe){
	switch(oe.type){
	case PADDLE:
		//console.log(oe.type + " : " + BALL);
		thisCenter = this.calcCenterXY();
		oeCenter = oe.calcCenterXY();
		var dx = thisCenter.x - oeCenter.x;
		var dy = thisCenter.y - oeCenter.y;
		var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
		this.xVel = this.speed * dx/dist;
		this.yVel = this.speed * dy/dist;
		//this.xVel *= -1;
		//this.yVel *= -1;
		break;
	case WALL:
		this.yVel *= -1;
		break;
	}
};

Ball.prototype.update = function(){
	this.x += this.xVel;
	this.y += this.yVel;
	
	this.localTicks++;
};