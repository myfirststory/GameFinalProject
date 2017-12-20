/**
 *
 */
function Howto () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
Howto.prototype = proto;

Howto.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Howto.prototype.create = function() {
	var bg = this.add.image(0,0,"howto");
	var b1 = this.add.button(400, 400,"backbutton",back,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	
};

function back(){
	this.game.state.start("Menu");
}