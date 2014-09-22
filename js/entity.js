/**
Abstract class 
*/

function Entity(x,y){
	this.spriteSheetRef;

	this.type;
	this.x = x;
	this.y = y;
	this.viewWidth;
	this.viewHeight;
	this.viewable = true;

	this.collidable = true;
	this.collisionWidth;
	this.collisionHeight;
	
	this.localTicks = 0;
	
	this.zHeight = 0; // zHeight ranks rendering priority
}


Entity.prototype.collides = function(oe){
	if(this.collidable && oe.collidable){
		return this.rectRectCollides(oe);
	}
};

Entity.prototype.rectRectCollides = function(oe){
	//return !(x_1 > x_2+width_2 || x_1+width_1 < x_2 || y_1 > y_2+height_2 || y_1+height_1 < y_2);
	var thisColWidth = this.collisionWidth;
	var thisColHeight = this.collisionHeight;
	var oeColWidth = oe.collisionWidth;
	var oeColHeight = oe.collisionHeight;
	
	return !(this.x > oe.x + oeColWidth || this.x + thisColWidth < oe.x || this.y > oe.y + oeColHeight || this.y + thisColHeight < oe.y);
};

Entity.prototype.update = function(game){
	this.localTicks++;
};

Entity.prototype.shouldDestroy = function(){
	return false;
};

Entity.prototype.shouldRender = function(){
	return (this.x + this.viewWidth > 0 && this.x < GAMEWIDTH) && (this.y + this.viewHeight > 0 && this.y < GAMEHEIGHT);
};

/**
Should only update "next" variables - variables which are updated and then later in the same frame applied
or variables who other entities don't depend from
*/
Entity.prototype.updateCollision = function(oe){

};

Entity.prototype.calcCenterXY = function(){
	return {x : this.x + this.viewWidth/2, y : this.y + this.viewHeight/2};
};

Entity.prototype.setCenter = function(cx,cy){
	/*
	Sets the center of the object to cx,cy by updating the x,y 
	accordingly (remember x,y is always the top left of the object
	regardless of rotation)
	*/
	this.x = cx - this.viewWidth/2;
	this.y = cy - this.viewHeight/2;	
};
