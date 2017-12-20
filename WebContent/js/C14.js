/**
 *
 */
function C14 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C14.prototype = proto;

C14.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C14.prototype.create = function() {
	var C14 = this.add.image(0,0,"picture13");
	var b1 = this.add.button(50, 50,"backbutton",back14,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",start,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back14(){
	this.game.state.start("C13");
}

/*---put state here bitch!---*/
function start(){
	this.game.state.start("C13");
}