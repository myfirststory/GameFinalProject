/**
 *
 */
function C8 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C8.prototype = proto;

C8.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C8.prototype.create = function() {
	var c8 = this.add.image(0,0,"picture8");
	var b1 = this.add.button(50, 50,"backbutton",back8,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next8,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back8(){
	this.game.state.start("C7");
}
function next8(){
	this.game.state.start("C9");
}