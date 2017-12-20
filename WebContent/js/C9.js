/**
 *
 */
function C9 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C9.prototype = proto;

C9.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C9.prototype.create = function() {
	var c9 = this.add.image(0,0,"picture9");
	var b1 = this.add.button(50, 50,"backbutton",back9,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next9,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back9(){
	this.game.state.start("C8");
}
function next9(){
	this.game.state.start("C10");
}