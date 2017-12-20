/**
 *
 */
function C1 () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
C1.prototype = proto;

C1.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
	this.game.musics = this.add.audio("Peaks");
	this.game.musics.play();
};

C1.prototype.create = function() {
	//this.game.musics=this.add.sound("Peaks",1,true);

	//this.musics.play();
	var c1 = this.add.image(0,0,"picture1");
	var b1 = this.add.button(50, 50,"backbutton",back,this,2,1,0);
	b1.anchor.set(0.5, 0.5);
	b1.alpha = 1;
	var b2 = this.add.button(740, 50,"next",next,this,2,1,0);
	b2.anchor.set(0.5, 0.5);
	b2.alpha = 1;

};
function musicstop(){
	this.musics.stop();
}

function back(){
	this.game.state.start("Menu");
}
function next(){
	this.game.state.start("C2");
	//this.musics.stop();
}

function stopmusic(){
	this.musics.stop();
}