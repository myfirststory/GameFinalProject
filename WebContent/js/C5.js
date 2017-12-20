/**
 *
 */
function C5 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C5.prototype = proto;

C5.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C5.prototype.create = function() {
	var c5 = this.add.image(0,0,"picture5");
	var b1 = this.add.button(50, 50,"backbutton",back5,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next5,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back5(){
	this.game.state.start("C4");
}
function next5(){
	this.game.state.start("C6");
}