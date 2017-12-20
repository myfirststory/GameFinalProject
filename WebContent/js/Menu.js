/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};





Menu.prototype.create = function() {
	this.game.camera.setSize(800,600);
	//this.game.resizeWorld();
	var bg = this.add.image(0,0,"menu");
		
	var b1 = this.add.button(400, 400,"start2",actionOnClick,this,2,1,0);
		b1.anchor.set(0.5, 0.5);
		b1.alpha = 1;
		
	var b2 = this.add.button(400,450,"howtoplay2",gotoHowto,this,2,1,0);
		b2.anchor.set(0.5, 0.5);	
		
	var b3 = this.add.button(400,500,"exit2",exit,this,2,1,0);
		b3.anchor.set(0.5, 0.5);
		
		b1.inputEnabled = true;
		
		
};




function actionOnClick () {
    this.game.state.start("C1");
    
}

function gotoHowto(){
	this.game.state.start("Howto");
}

function exit(){
	window.close();
}

