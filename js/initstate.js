function InitState(){
	this.type = INITSTATE;
	this.localTicks = 0;
	
}
InitState.prototype = Object.create(State.prototype);

InitState.prototype.init = function(game){

		
		game.imageHandler.queueDownload("img/paddle.png");

		//game.audioHandler.queueDownload("audio/alive.m4a");
		this.downloadAndLaunch(game);
		
		
};

InitState.prototype.downloadAndLaunch = function(game){
	game.imageHandler.downloadAll(this.__imageDownloadCallback,game);
}

InitState.prototype.__imageDownloadCallback = function(game){
	game.audioHandler.downloadAll(
		game.__setState.bind(game), 
		GAMESTATE
		//MENUSTATE
	);
}

InitState.prototype.destroy = function(game){
	game.inputHandler.clearEvents();
};

InitState.prototype.update = function(game){
	this.localTicks++;
};

InitState.prototype.render = function(game){
	// just a logic state, no rendering
	// could add rendering if this takes some visible amount of time
};