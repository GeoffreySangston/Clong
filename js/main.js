function Main(){
	var game = new PongGame(HTMLActuator,Renderer,InputHandler);
	game.setNextState(INITSTATE);

	Engine.init(game);
	
	var engineReturn = Engine.run();
	
	Engine.destroy();
	return engineReturn;
}