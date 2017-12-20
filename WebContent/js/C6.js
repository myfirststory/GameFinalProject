/**
 *
 */
function C6 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C6.prototype = proto;

C6.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C6.prototype.create = function() {
	var c6 = this.add.image(0,0,"picture6");
	var b1 = this.add.button(50, 50,"backbutton",back6,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next6,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back6(){
	this.game.state.start("C5");
}
function next6(){
	this.game.state.start("C7");
}