function GameState(){
	this.localTicks = 0;
	this.type = GAMESTATE;
	
	this.entities;	
	this.collisions;
}

GameState.prototype.init = function(game){
	this.localTicks = 0;
	game.player1Paddle.resetPosition();
	game.player2Paddle.resetPosition();
	game.ball.resetPosition();
	this.entities = [game.player1Paddle, game.player2Paddle, game.ball, game.topWall, game.bottomWall];
	this.collisions = [];
};

GameState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};

GameState.prototype.update = function(game){
	this.handleInputs(game);
	this.checkCollisions(game);
	this.actCollisions();
	this.updateEntities(game);
	this.cleanup();
	this.checkWinCondition(game);
	this.localTicks++;
};

GameState.prototype.checkWinCondition = function(game){
	var ball = game.ball;
	var player1Paddle = game.player1Paddle;
	var player2Paddle = game.player2Paddle;
	
	var reset = false;
	if(ball.x + ball.viewWidth < 0){
		// point to player 2
		game.player2Score++;
		reset = true;
	} else if(ball.x > GAMEWIDTH){
		// point to player 1
		game.player1Score++;
		reset = true;
	}
	
	if(reset){
		player1Paddle.resetPosition();
		player2Paddle.resetPosition();
		ball.resetPosition();
	}
};

GameState.prototype.handleInputs = function(game){
	var keyStates = game.inputHandler.keyStates;
	var playerPaddle = game.player1Paddle;
	
	if(keyStates[S] == KEYDOWN || keyStates[DOWN] == KEYDOWN){
		playerPaddle.moveDown();
	} else if(keyStates[W] == KEYDOWN || keyStates[UP] == KEYDOWN){
		playerPaddle.moveUp();
	}
};
GameState.prototype.checkCollisions = function(game){
	this.collisions.length = 0;
	for(var i = 0; i < this.entities.length-1; i++){
		for(var j = i+1; j < this.entities.length; j++){
			if(this.entities[i].collides(this.entities[j])){
				this.collisions.push(new Collision(this.entities[i], this.entities[j]));
			}
		}
	}
};

GameState.prototype.actCollisions = function(){
	for(var i = 0; i < this.collisions.length; i++){
		var a = this.collisions[i].colliderA;
		var b = this.collisions[i].colliderB;
		
		a.updateCollision(b);
		b.updateCollision(a);
	}
};

GameState.prototype.updateEntities = function(game){
	for(var i = 0; i < this.entities.length; i++){
		this.entities[i].update(game);
	}
};

GameState.prototype.cleanup = function(game){
	for(var i = this.entities.length-1; i >= 0; i--){	
		if(this.entities[i].shouldDestroy()){
			this.entities.splice(i,1);
		}
	}
};

GameState.prototype.render = function(game){
	game.renderer.cls();
	
	this.renderEntities(game);
	this.renderHUD(game);
};

GameState.prototype.renderEntities = function(game){
	this.sortByZHeightNaive(this.entities);
	
		for(var i = 0; i < this.entities.length; i++){
		if(this.entities[i].shouldRender()){
			var x = this.entities[i].x;
			var y = this.entities[i].y;
			var w = this.entities[i].viewWidth;
			var h = this.entities[i].viewHeight;
			var theta = this.entities[i].theta;
			var px = this.entities[i].px;
			var py = this.entities[i].py;
			var viewable = this.entities[i].viewable;
			
			if(viewable){
				var spriteSheetRef = this.entities[i].spriteSheetRef;
				if(spriteSheetRef){
					var sheet = game.imageHandler.cache[spriteSheetRef];
					game.renderer.drawImage(sheet,x,y,w,h,theta,px,py);
				} else {
					game.renderer.drawRect(x,y,w,h,theta,px,py);
				}
			}
		}
	}
};

GameState.prototype.sortByZHeightNaive = function(entities){
	for(var i = 1; i < entities.length; i++){
		var curEnt = entities[i];
		var j = i - 1;
		
		while(j >= 0 && entities[j].zHeight > curEnt.zHeight){
			entities[j+1] = entities[j];
			j--;
		}
		entities[j+1] = curEnt;
	}	
};

GameState.prototype.renderHUD = function(game){
	game.renderer.drawText(50,50,game.player1Score,16);
	game.renderer.drawText(GAMEWIDTH-50,50,game.player2Score,16);
};