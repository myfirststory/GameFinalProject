/**
 *
 */
function C13 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C13.prototype = proto;

C13.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C13.prototype.create = function() {
	var C13 = this.add.image(0,0,"picture13");
	var b1 = this.add.button(50, 50,"backbutton",back13,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next13,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back13(){
	this.game.state.start("C12");
}
function next13(){
	this.game.state.start("Level");
	this.game.musics.stop();
}