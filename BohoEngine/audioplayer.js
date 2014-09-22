function AudioPlayer(audioHandler){
	this.audioHandler = audioHandler;
	this.volume = 1;
}

/*
All params are in millis

audioStart is where to start playing from
loopStart is where to start looping from
loopLength is the length of the loop, use this to calculate the loopEnd ms 
*/
AudioPlayer.prototype.loopAudio = function(audioRef, audioStart, loopStart, loopLength){
	var audio = this.audioHandler.cache[audioRef];
	if(!audio){
		throw("No such audio: " + audioRef);
	}
	
	audio.currentTime = audioStart;
	audio.volume = this.volume;
	audio.play();
}