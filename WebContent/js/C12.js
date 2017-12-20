/**
 *
 */
function C12 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C12.prototype = proto;

C12.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C12.prototype.create = function() {
	var C12 = this.add.image(0,0,"picture12");
	var b1 = this.add.button(50, 50,"backbutton",back12,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next12,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back12(){
	this.game.state.start("C11");
}
function next12(){
	this.game.state.start("C13");
}