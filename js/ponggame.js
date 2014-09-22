function PongGame(HTMLActuator,Renderer,InputHandler){
	this.htmlActuator = new HTMLActuator();
	this.renderer = new Renderer(this.htmlActuator.canvas, GAMEWIDTH, GAMEHEIGHT);
	this.inputHandler = new PongInputHandler(this.htmlActuator.canvas);
	this.imageHandler = new ImageHandler();
	this.audioHandler = new AudioHandler();
	this.audioPlayer = new AudioPlayer(this.audioHandler);

	this.stateFactory = new PongStateFactory();
	this.stateMachine = new StateMachine();
	
	this.ticks = 0;
	
	this.nextStateId;
	
	this.player1Score = 0;
	this.player2Score = 0;
	
	var paddleOffset = 8;
	this.player1Paddle = new Paddle(0,0);
	this.player2Paddle = new AIPaddle(0,0);
	this.player1Paddle.x = paddleOffset;
	this.player2Paddle.x = GAMEWIDTH - this.player2Paddle.viewWidth - paddleOffset;

	this.ball = new Ball(0,0);
	
	this.topWall = new Wall(0, 0);
	this.bottomWall = new Wall(0, 0);
	this.topWall.y = -this.topWall.viewHeight;
	this.bottomWall.y = GAMEHEIGHT;
}

PongGame.prototype = Object.create(Game.prototype);
