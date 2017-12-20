window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(800, 600, Phaser.AUTO);
	
	
	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("Level2", Level2);
	game.state.add("Level3", Level3);
	game.state.add("C1", C1);
	game.state.add("C2", C2);
	game.state.add("C3", C3);
	game.state.add("C4", C4);
	game.state.add("C5", C5);
	game.state.add("C6", C6);
	game.state.add("C7", C7);
	game.state.add("C8", C8);
	game.state.add("C9", C9);
	game.state.add("C10", C10);
	game.state.add("C11", C11);
	game.state.add("C12", C12);
	game.state.add("C13", C13);
	game.state.add("C14", C14);
	game.state.add("Howto", Howto);
	// Now start the Boot state.
	game.state.start("Boot");
};
