function PongInputHandler(gameContainer){
	this.gameContainer = gameContainer;
	
	this.events = {};
	
	this.listen();
	
	this.keyStates = {};

	this.keyStates[A] = KEYSTATIC;
	this.keyStates[W] = KEYSTATIC;
	this.keyStates[D] = KEYSTATIC;
	this.keyStates[S] = KEYSTATIC;
	this.keyStates[LEFT] = KEYSTATIC;
	this.keyStates[UP] = KEYSTATIC;
	this.keyStates[RIGHT] = KEYSTATIC;
	this.keyStates[DOWN] = KEYSTATIC;
	
}

PongInputHandler.prototype = Object.create(InputHandler.prototype);

PongInputHandler.prototype.listen = function(){
	var self = this;
	
	window.addEventListener('keydown', function(e){
		//console.log(e.keyCode);
		if(!isNaN(self.keyStates[e.keyCode])){ // if it's a key we're paying attention to
			if(e.keyCode == UP || e.keyCode == DOWN){
				e.preventDefault(); // prevents it from scrolling up/down when using those arrow keys
			}
			
			
			if(self.keyStates[e.keyCode] != KEYDOWN){ // line makes it not emit nonstop
				self.keyStates[e.keyCode] = KEYDOWN;
			}

		}
	});
	
	window.addEventListener('keyup', function(e){
		self.keyStates[e.keyCode] = KEYUP;
	});
};