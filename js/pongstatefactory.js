function PongStateFactory(){

}

PongStateFactory.prototype = Object.create(StateFactory.prototype);

PongStateFactory.prototype.getState = function(stateId){
	switch(stateId){
		case INITSTATE: return new InitState();
		case MENUSTATE: return new MenuState();
		case GAMESTATE: return new GameState();
		default:
	
	}
};