/**
 *
 */
function C7 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C7.prototype = proto;

C7.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C7.prototype.create = function() {
	var c7 = this.add.image(0,0,"picture7");
	var b1 = this.add.button(50, 50,"backbutton",back7,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next7,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back7(){
	this.game.state.start("C6");
}
function next7(){
	this.game.state.start("C8");
}