/**
 *
 */
function C4 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C4.prototype = proto;

C4.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C4.prototype.create = function() {
	var c4 = this.add.image(0,0,"picture4");
	var b1 = this.add.button(50, 50,"backbutton",back4,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next4,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back4(){
	this.game.state.start("C3");
}
function next4(){
	this.game.state.start("C5");
}