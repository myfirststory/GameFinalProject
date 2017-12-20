/**
 *
 */
function C2 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C2.prototype = proto;

C2.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C2.prototype.create = function() {
	var c2 = this.add.image(0,0,"picture2");
	var b1 = this.add.button(50, 50,"backbutton",back2,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next2,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back2(){
	this.game.state.start("C1");
}
function next2(){
	this.game.state.start("C3");
}