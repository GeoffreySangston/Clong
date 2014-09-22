function AIPaddle(x,y){
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
	this.movingUp = true;
}

AIPaddle.prototype = Object.create(Paddle.prototype);

AIPaddle.prototype.update = function(game){
	var ball = game.ball;

	if(ball.xVel > 0){
		this.moveToBall(ball);
	} else {
		this.moveAboutCenter();
	}
};

AIPaddle.prototype.moveToBall = function(ball){
	var thisCenter = this.calcCenterXY();
	var ballCenter = ball.calcCenterXY();
	
	if(ball.yVel >= 0 && (ballCenter.y > thisCenter.y)){
		this.moveDown();
	} else if(ball.yVel < 0 && (ballCenter.y < thisCenter.y)){
		this.moveUp();
	}
};

AIPaddle.prototype.moveAboutCenter = function(){
	var thisCenter = this.calcCenterXY();

	if(this.movingUp){
		this.moveUp();
	} else {
		this.moveDown();
	}
	
	if(thisCenter.y < GAMEHEIGHT/2 - 75){
		this.movingUp = false;
	} else if(thisCenter.y > GAMEHEIGHT/2 + 75){
		this.movingUp = true;
	}
};