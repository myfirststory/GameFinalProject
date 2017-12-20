/**
 *
 */
function C11 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C11.prototype = proto;

C11.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C11.prototype.create = function() {
	var c11 = this.add.image(0,0,"picture11");
	var b1 = this.add.button(50, 50,"backbutton",back11,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next11,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back11(){
	this.game.state.start("C10");
}
function next11(){
	this.game.state.start("C12");
}