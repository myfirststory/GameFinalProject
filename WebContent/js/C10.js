/**
 *
 */
function C10 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C10.prototype = proto;

C10.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

C10.prototype.create = function() {
	var c10 = this.add.image(0,0,"picture10");
	var b1 = this.add.button(50, 50,"backbutton",back10,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next10,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;
	
};

function back10(){
	this.game.state.start("C9");
}
function next10(){
	this.game.state.start("C11");
}