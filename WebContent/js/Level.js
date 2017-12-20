/**
 * Level state.
 */
function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;
var livingEnemies = [];
Level.prototype.create = function() {
	
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.music=this.add.sound("stage1",1,true);
		this.music.play();
		this.fire=this.add.sound("fire",1,false);
		this.fire.allowMultiple=true;
		this.expd=this.add.sound("explod",1,false);
		this.expd.allowMultiple=true;
		this.dead=this.add.sound("dead",1,false);
		this.dead.allowMultiple=true;
		
	
	
	this.map = this.game.add.tilemap("citymap");
	 this.map.addTilesetImage('tileset');
	 this.map_layer1 = this.map.createLayer("floor");
	 this.map_layer1.resizeWorld();
	 this.map_layer2 = this.map.createLayer("bulid");
	 this.map_layer2.resizeWorld();
	 
		this.map.setCollisionBetween(0, 2000, true, this.map_layer2);

	 
	 this.enemies1 = this.add.group();
	 this.enemies2= this.add.group();

	 for(x in this.map.objects.Object_Layer_1){
	 var obj = this.map.objects.Object_Layer_1[x];
	 if(obj.type == "player"){
	 console.log(this.player);
	 this.player = this.addPlayer(obj.x,obj.y);
	 this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
	 this.player.play("idle");
	 this.player.maxHealth = 1;
		this.player.setHealth(1);
		 this.player.events.onKilled.addOnce(this.onPlayerKilled,this); 
	 }else if(obj.type=="enemy1"){
	 var c = this.addCat(obj.x,obj.y);
	 this.enemies1.add(c);
	 }else if(obj.type=="enemy2"){
		 var c = this.addDog(obj.x,obj.y);
		 this.enemies2.add(c);
		 }else if(obj.type="goal"){
			 this.portal=this.addPortal(obj.x,obj.y);
			 
		 }	
		 } 
	 this.createWeapon();
	 
	this.nextShot=1;
	this.livingEnemies=[];
	this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(30, 'bullet');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 1);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
	
    die = this.add.image(this.game.width/2, this.game.height/2,"cut1");
	//die.alpha = 0.85;
	die.fixedToCamera = true;
	die.anchor.set(0.5,0.5);
	die.scale.set(0.1);
	
	die.inputEnabled=true;
	die.events.onInputDown.add(this.killIntro,this);
	this.killed=false;
	tw = this.add.tween(die.scale);
	tw.to({x:0.6,y:0.6},400, "Linear",true,0);
	
	this.canplay = false;
	this.delayStart=0;
	 this.ui = this.add.group();
	 this.ui.fixedToCamera= true;
	
	this.btn_left = this.add.button(40,450,"left");
	this.btn_left.scale.x =1.4;
	this.btn_left.scale.y =1.4;
	this.btn_left.alpha =0.6;
	
	
	this.btn_right = this.add.button(150,450,"right");
	this.btn_right.alpha =0.6;
	this.btn_right.scale.x =1.5;
	this.btn_right.scale.y =1.5;
	
	this.btn_up = this.add.button(95,390,"up");
	this.btn_up.alpha =0.6;
	this.btn_up.scale.x =1.5;
	this.btn_up.scale.y =1.5;
	
	this.btn_down = this.add.button(95,510,"down");
	this.btn_down.alpha =0.6;
	this.btn_down.scale.x =1.5;
	this.btn_down.scale.y =1.5;
	
	this.btn_gun = this.add.button(670,450,"gun");
	this.btn_gun.alpha =0.6;
	this.btn_gun.scale.x =1.8;
	this.btn_gun.scale.y =1.8;
	
	this.ui.add(this.btn_left);
	this.ui.add(this.btn_right);
	this.ui.add(this.btn_up);
	this.ui.add(this.btn_down);
	this.ui.add(this.btn_gun);
	
	
	this.btn_left.onInputDown.add(this.inputDown,this.btn_left);
	this.btn_left.onInputUp.add(this.inputUp,this.btn_left);
	
	this.btn_right.onInputDown.add(this.inputDown,this.btn_right);
	this.btn_right.onInputUp.add(this.inputUp,this.btn_right);
	
	this.btn_up.onInputDown.add(this.inputDown,this.btn_up);
	this.btn_up.onInputUp.add(this.inputUp,this.btn_up);
	
	this.btn_down.onInputDown.add(this.inputDown,this.btn_down);
	this.btn_down.onInputUp.add(this.inputUp,this.btn_down);
	
	this.btn_gun.onInputDown.add(this.inputDown,this.btn_gun);
	this.btn_gun.onInputUp.add(this.inputUp,this.btn_gun);
	
   
};

Level.prototype.update = function() {
	this.btn_left.alpha =0.6;
	this.btn_right.alpha =0.6;
	this.btn_up.alpha =0.6;
	this.btn_down.alpha =0.6;
	this.btn_gun.alpha =0.6;
	if(!this.canplay){
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.killed==true ){
			
			die.kill();
			this.canplay=true;
			this.delayStart=this.game.time.now + 400;
		
		}
	}
	if(this.canplay && this.delayStart<this.game.time.now){
	this.game.physics.arcade.collide(this.player,this.map_layer2);
	this.game.physics.arcade.collide(this.portal,this.map_layer2);
	 this.physics.arcade.collide(this.enemies1,this.player,this.onPlayerCollide,null,this); 
	 this.physics.arcade.collide(this.enemies2,this.player,this.onPlayerCollide,null,this); 
	 this.physics.arcade.collide(this.player,this.portal,this.onCollidePortal,null,this);
	this.game.physics.arcade.collide(this.enemies1,this.map_layer2);
	this.game.physics.arcade.collide(this.enemies2,this.map_layer2);
	//this.game.physics.arcade.collide(this.weapon1.bullets,this.map_layer2);
	
	 this.physics.arcade.collide(this.enemies1,this.weapon1.bullets,this.onCollide,null,this);
	 this.physics.arcade.collide(this.enemies2,this.weapon1.bullets,this.onCollide,null,this);
	
	 
		this.game.physics.arcade.collide(this.weapon1.bullets,this.map_layer2, hitWall);
		 
		this.enemies1.forEachAlive(function(enemy){
			if(this.math.distancePow(this.player.x,this.player.y,enemy.x,enemy.y)<250){
				this.physics.arcade.moveToObject(enemy, this.player, 80);
					if(this.player.x > enemy.x && this.player.y-enemy.y<=Math.abs(50)){
						enemy.scale.x=1;
						enemy.angle=0;
					} if(Math.abs(this.player.x-enemy.x)<=20&&this.player.y-enemy.y>50){
						enemy.scale.x=1;
						enemy.angle=90;
					}
					if(this.player.x < enemy.x && this.player.y-enemy.y<=Math.abs(50)){
						enemy.scale.x=-1;
						enemy.angle=0;
					}
					if(Math.abs(this.player.x-enemy.x)<=20 &&this.player.y-enemy.y<-50){
						enemy.scale.x=1;
						enemy.angle=-90;
					}
					
					
				enemy.play("walk");	
			
			}
		},this);
		
		
		this.enemies2.forEachAlive(function(enemy){
			if(this.math.distancePow(this.player.x,this.player.y,enemy.x,enemy.y)<250){
				this.physics.arcade.moveToObject(enemy, this.player, 110);
					if(this.player.x > enemy.x && this.player.y-enemy.y<=Math.abs(50)){
						enemy.scale.x=0.5;
						enemy.angle=0;
					} if(Math.abs(this.player.x-enemy.x)<=20&&this.player.y-enemy.y>50){
						enemy.scale.x=0.5;
						enemy.angle=90;
					}
					if(this.player.x < enemy.x && this.player.y-enemy.y<=Math.abs(50)){
						enemy.scale.x=-0.5;
						enemy.angle=0;
					}
					if(Math.abs(this.player.x-enemy.x)<=20 &&this.player.y-enemy.y<-50){
						enemy.scale.x=0.5;
						enemy.angle=-90;
					}
					
					
				enemy.play("walk");	
			
			}
		},this);
		
		//this.enemyFires();
		  
		
	if ((this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ||this.btn_gun.isdown)&& this.nextShot<this.game.time.now){
			
		this.fireWeapon();
		this.fire.play();
		this.player.play("fire");
		this.isFire=true;
		//this.player.scale.setTo(2.5);
		this.btn_gun.alpha =1;
	this.nextShot = this.game.time.now + 400;

	}
	//this.player.scale.setTo(1);
		if(this.nextShot<this.game.time.now){
	
		if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) ||this.btn_left.isdown) {
			
		this.player.body.velocity.x = -150;this.player.scale.x = -1;
		this.player.play("walk");
		this.player.angle = 0;
		this.btn_left.alpha =1;
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ||this.btn_right.isdown ) {
		this.player.body.velocity.x = 150;this.player.scale.x = 1;
		this.player.play("walk");
		this.player.angle = 0;
		this.btn_right.alpha =1;
	}  
	
	else if (this.input.keyboard.isDown(Phaser.Keyboard.UP) ||this.btn_up.isdown) {
		//if(this.player.body.velocity.y==0)
		this.player.body.velocity.y = -200;
		console.log(this.player.angle);
		this.player.scale.x = 1;
		this.player.angle = -90;
		this.player.play("walk");
		this.btn_up.alpha =1;
		
	} else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) ||this.btn_down.isdown) {
		//if(this.player.body.velocity.y==0)
			this.player.body.velocity.y = 200;
			this.player.scale.x = 1;
			this.player.angle = 90;
			this.player.play("walk");
			this.btn_down.alpha=1;
			
	}else if(this.isFire){
		
	this.player.play("fire");
		this.isFire=false;
	}

	 else {
		 this.player.play("idle");
		//this.player.body.velocity.setTo(0, 0);
		//this.player.body.acceleration.setTo(0, 0);
		//if(this.player.body.velocity.x==0) this.player.play("idle");
	}
	
	}
	
		     
	}
	}

Level.prototype.addPortal = function(x,y) 
{
	d = this.game.add.sprite(x,y-74,"portal");
	d.animations.add("all").play(16,true,true);
	d.anchor.set(0.5,1);
	this.game.physics.enable(d);
	d.body.collideWorldBounds = true;
	d.y+=80;
	return d;
};

Level.prototype.addPlayer = function(x,y) {
	var t = this.add.sprite(x,y,"chart");
	t.animations.add("idle", mframe("idle",1),12,true);
	t.animations.add("dead", mframe("dead",3),12,true);
	t.animations.add("walk", mframe("walk",3),6,true);
	t.animations.add("fire", mframe("fire",2),12,false);
	
	t.anchor.set(0.5,0.5);
	t.smoothed = false;
	
	//this.game.physics.arcade.enable(t);
	t.play("idle");
	this.game.physics.enable(t);
	t.body.collideWorldBounds = true;
	t.body.drag.setTo(800, 800);
	t.body.setSize(30,50,3,0);

	return t;
	};

	function mframe(key,n){
		f=[];
		for(var i=1;i<=n;i++){
		 f.push(key+" ("+i+")");
		}
		return f;
		}

	
	
	Level.prototype.addCat = function(x,y) {
		var t = this.add.sprite(x,y,"enemy1");
		t.animations.add("idle", mframe("idle",1),12,true);
		t.animations.add("fire", mframe("fire",2),12,true);
		t.animations.add("walk", mframe("walk",3),5,true);
		t.anchor.set(0.5,0.5);
		t.smoothed = false;
		t.scale.x=-1;
		t.x+=50;
		t.y-=30;
		
		//this.game.physics.arcade.enable(t);
		t.play("idle");
		this.game.physics.enable(t);
		t.body.collideWorldBounds = true;
		t.body.setSize(30,30,0,0);
		return t;
		};

		Level.prototype.addDog = function(x,y) {
			c = this.add.sprite(x,y,"enemy2");
			c.animations.add("idle", mframe("idle",1),12,true);
			//c.animations.add("dead", mframe("Dead",10),12,true);
			
			c.play("idle");
			c.x+=25;
			//this.game.physics.arcade.enable(c);
			c.anchor.set(0.5,0.5);
			this.game.physics.enable(c);
			c.body.collideWorldBounds = true;
			c.body.setSize(20,20,0,0);
			c.scale.setTo(0.5);
			return c;
		};
		
		Level.prototype.createWeapon = function() {  
			this.weapon1 = this.add.weapon(10,"bullet",1);  
			this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;  
			this.weapon1.trackSprite(this.player,20,13); 
			this.weapon1.bulletSpeed = 300;  this.weapon1.fireAngle = 0;   
			this.weapon1.rate = 5;   
			this.weapon1.setBulletBodyOffset(32,32);
			
			
			
		} 
		
		Level.prototype.createWeaponEnemy = function(enemy) {  
			w = this.add.weapon(10,"bullet",1);  
			w.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;  
			w.trackSprite(enemy,20,13); 
			w.bulletSpeed = 300;  w.fireAngle = 0;   
			w.rate = 5;   
			w.setBulletBodyOffset(32,32);
			//this.enemiesWeapon.add(w);
			return w;
			
		} 
		Level.prototype.fireWeapon = function(){
			//if(nextShot>game.time.now){}
			console.log(this.player.angle);
			
			if(this.player.angle==90) {
				this.weapon1.fireAngle=90;
				this.weapon1.trackSprite(this.player,-20,13); 
			}
			if(this.player.angle==-90) {
				this.weapon1.fireAngle=-90;
				this.weapon1.trackSprite(this.player,20,13); 
			}
			if(this.player.scale.x==-1 && this.player.angle==0) {
				this.weapon1.fireAngle=180;
				this.weapon1.trackSprite(this.player,20,13); 
			}
			if(this.player.scale.x==1 && this.player.angle==0)
				{
				this.weapon1.fireAngle=0;
				this.weapon1.trackSprite(this.player,20,13); 
				}
			this.weapon1.fire();
			//this.weapon2.fire();
			//this.player.x=3000;
			//this.player.y=640;
			
			
			return;
			//nextShot = game.time.now + 1000;
			
		} 
		
		Level.prototype.onCollide = function(enemies,bullet){  
			enemies.kill();  
			bullet.kill(); 
			this.expd.play();
			exp=this.add.sprite(enemies.x,enemies.y,"explos");
			exp.anchor.set(0.5);
			exp.animations.add("all").play(16,false,true);
			 };
			 
			 Level.prototype.onCollidePortal = function(player,portal){  
					this.music.stop();
					this.game.state.start("Level2");
					 };
			 function hitWall(bullet,platfomrs) {
					bullet.kill();
				}
			 Level.prototype.enemyFires = function() {	
				 this.bullet = this.enemyBullets.getFirstExists(false);

				    this.livingEnemies.length=0;

				    this.enemies1.forEachAlive(function(enemy){

				        // put every living enemy in an array
				        this.livingEnemies.push(enemy);
				    });


				    if (this.bullet && this.livingEnemies.length > 0)
				    {
				        
				        this.random=this.game.rnd.integerInRange(0,this.livingEnemies.length-1);

				        // randomly select one of them
				        this.shooter=this.livingEnemies[this.random];
				        // And fire the bullet from this enemy
				        this.bullet.reset(this.shooter.body.x, this.shooter.body.y);

				        this.game.physics.arcade.moveToObject(this.bullet,this.player,120);
				        this.firingTimer = this.game.time.now + 2000;
				    }

				 
			 }
			 Level.prototype.onPlayerKilled = function(){  
				 this.gameover=true; 
				 this.dead.play();
					//die = this.add.text(this.game.width/2, this.game.height/2, "à¸„à¸¸à¸“à¸–à¸¹à¸à¸‹à¸­à¸¡à¸šà¸µà¹‰à¸à¸´à¸™!", { fill: 'Red'});
					die = this.add.image(this.game.width/2, this.game.height/2,"wasted");
					//die.alpha = 0.85;
					die.fixedToCamera = true;
					die.anchor.set(0.5,0.5);
					die.scale.set(0.1);
					tw = this.add.tween(die.scale);
					tw.to({x:1,y:1},800, "Linear",true,0);
					delay = this.add.tween(die);
					delay.to({y:-360},1000, "Linear",true,4000);
					tw.chain(delay);
					delay.onComplete.addOnce(this.quitGame, this);  };  

				 Level.prototype.onPlayerCollide = function(enemy,player){ 
					 enemy.damage(1);  
					 return true; } 
				 
				 Level.prototype.inputDown = function(){
						this.alpha = 1;
						this.isdown = true;
					};
					Level.prototype.inputUp = function(){
						this.alpha = 0.6;
						this.isdown = false;
					};
					
			
					
					Level.prototype.killIntro = function() {
						this.killed=true;
						
					};
					
					
Level.prototype.quitGame = function() {
	this.music.stop();
	this.game.state.start("Menu");
};