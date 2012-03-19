/*************************/
/*						 */
/*		a player entity	 */
/*						 */
/*************************/
var PlayerEntity = me.ObjectEntity.extend(
{	
    init:function (x, y, settings)
    {
    	settings.image = "marmalade";
    	settings.spritewidth = 64;
    	// call the constructor
    	this.parent(x, y , settings);
    	this.gravity = 0;
    	// set the walking & jumping speed
    	this.setVelocity(7, 7);
    	// adjust the bounding box
    	this.updateColRect(2,60,1,63);
    	this.type = 'player';
    	this.collidable = true;
    	this.boss_fight = Director.isBossFight();
    	this.lock_controls = Director.isBossFight();
    },
    update : function ()
    {
    	if(this.boss_fight && this.lock_controls){
    		if(Director.isBossInPlace()){
    			this.lock_controls = false;
    		}
    	}
    	if(!this.lock_controls){
    		if(me.input.isKeyPressed('up')) {
    			this.vel.y -= 1;
    		} else if(me.input.isKeyPressed('down')) {
    			this.vel.y += 1	;
    		} else if(this.vel.y != 0) {
    			if(this.vel.y > 1){
    				this.vel.y -= 0.2;
    			} else if (this.vel.y < -1) {
    				this.vel.y += 0.2;
    			} else {
    				this.vel.y = 0;
    			}
    		}
    		if(me.input.isKeyPressed('forward')){
    			this.vel.x += 1;
    		} else if(me.input.isKeyPressed('backward')){
    			this.vel.x -= 1;
    		} else if(this.vel.x != 1) {
    			if(this.vel.x > 2){
    				this.vel.x -= 0.2;
    			} else if(this.vel.x < 0) {
    				this.vel.x += 0.2;
    			} else {
    				this.vel.x = 1;
    			}
    		}
    		if(me.input.isKeyPressed('fire')){
    			me.audio.play('bleep');
    			var obj = new LaserEntity(this.pos.x + this.width - 10,this.pos.y + (this.height / 4),{});
    			me.game.add(obj, this.z);
    			me.game.sort();
    			Director.player.laserShot();
    		}
    	} else {
    		this.vel.x = 1;
    	}
    	if(this.pos.x < me.game.viewport.pos.x){
    		this.vel.x += 2;
    	}
    	if(this.pos.x > me.game.viewport.pos.x + me.game.viewport.width - this.width){
    		this.vel.x -= 2;
    	}
    	// check & update player movement
    	this.updateMovement();
    	var res = me.game.collide(this);
    	// update animation
    	if (this.vel.x!=0 || this.vel.y!=0)
    	{
    		// update objet animation
    		this.parent(this);
    		return true;
    	}
    	return false;
    },
    die : function(){
    		var obj = new ExplosionEntity(this.pos.x + this.width / 2 + this.vel.x,this.pos.y + this.height / 2,{});
    		me.game.add(obj, this.z);
    		me.game.sort();
    		return Director.player.takeLifes(1);
    },
    respawn : function(){
    		this.pos.x = me.game.viewport.pos.x + this.width * 1.5 ;
    		this.pos.y = me.game.viewport.height / 2;
    		Director.player.setHealth(100)
    		this.flicker(150);
    },
    onCollision : function (res, obj)
    {
    		if(obj.type != 'enemy_laser'){
    		}
    		if(!this.isFlickering()){
    			this.flicker(45);
    			if(Director.player.takeHealth(10)){
    				if(this.die()){
    					this.respawn();
    				}
    			}
    			Director.player.updateScore(50);
    			this.vel.x = -8;
    		}
    },

});
 /****************************************************************************/
/*																			*/
/*		The Explosion Entity BOOOOOOOOOOOOOOOOOM							*/
/*																			*/
/****************************************************************************/
var ExplosionEntity = me.ObjectEntity.extend(
{										 
    init: function (x, y, settings)
    {
    	settings.image = "explosion";
    	settings.spritewidth = 64;
    	settings.width = 64;
    	settings.height = 64;
    	this.parent(x, y , settings);
    	this.gravity = 0;
    	this.addAnimation('explode',[0,1,2,3,3]);
    	this.setCurrentAnimation("explode", function(){me.game.remove(this)});
    	me.audio.play('boom');
    },		
    update : function(){
    	this.vel.y = 0;
    	this.vel.x = -1;
    	// check & update movement
    	this.updateMovement();
    	
    	if (this.vel.x!=0 ||this.vel.y!=0)
    	{
    	// update the object animation
    	 	this.parent();
    	 	return true;
    	}
    	return false;					  
	}									
});
 /****************************************************************************/
/*																			*/
/*		The Laser Entity POW POW POW POW POW POW							*/
/*																			*/
/****************************************************************************/
var LaserEntity = me.ObjectEntity.extend(
{										 
    init: function (x, y, settings)
    {
    	settings.image = "laser";
    	settings.spritewidth = 32;
    	settings.width = 32;
    	settings.height = 32;
    	this.parent(x, y , settings);
    	if(settings.enemy_laser){
    		this.enemy_laser = true;
    		this.type = 'enemy_laser';
    	} else {
    		this.enemy_laser = false;
    		this.type = 'player_laser';
    	}
    	this.gravity = 0;
    	this.updateColRect(14,4,14,4);
    },		
    update : function(){
    	if(this.pos.x > me.game.viewport.pos.x + me.game.viewport.width){
    		Director.player.laserMiss()
    		me.game.remove(this);
    	} else if(this.pos.x < me.game.viewport.pos.x - this.width){
    		me.game.remove(this);
    	} else {
    		this.vel.x = (this.enemy_laser) ? -6 : 8;
    	}
    	this.vel.y = 0;
    	// check & update movement
    	this.updateMovement();
    	var res = me.game.collide(this);
    	if(res){
    		if(res.type == me.game.ENEMY_OBJECT && this.type == 'player_laser'){
    			me.game.remove(this);
    			Director.player.updateScore(100);
    		}
    		if(res.type == 'boss'){
    			me.game.remove(this);
    		}
    	}
    	if(this.vel.x!=0 ||this.vel.y!=0) {
    	// update the object animation
    	 	this.parent();
    	 	return true;
    	}
    	return false;					  
	}   									
});
/****************************************************************************/
/*																			*/
/*		The Scroll Entity to keep things rolling 							*/
/*																			*/
/****************************************************************************/
var ScrollEntity = me.InvisibleEntity.extend(
{	
    init: function (x, y, settings)
    {
    	this.speed = (settings.speed) ? settings.speed : 1;
    	x = 375;
    	this.parent(x, y, settings);
    	me.game.viewport.follow(this.pos, me.game.viewport.AXIS.HORIZONTAL);
    	this.endPos = me.game.currentLevel.realwidth - (me.game.viewport.width / 2);
    	this.updatestage = true;
    },
    update : function ()
    {
    	if(this.updatestage < this.pos.x && this.updatestage !== false){
    		this.updatestage = Director.updateStage(me.game.viewport.pos.x);
    	}
    	if(this.pos.x < this.endPos){
    		this.pos.x += this.speed;
    	} else {
    		Director.next();
    	}
    	return true;
    }
});
/****************************************************************************/
/*																			*/
/*		an enemy Entity														*/
/*																			*/
/****************************************************************************/
var EnemyEntity = me.ObjectEntity.extend(
{	
    init: function (x, y, settings)
    {
    	sprites = ["gundam","spice_man","moomin","pimp","he_man"]
    	// define this here instead of tiled
    	switch(me.levelDirector.getCurrentLevelId()){
    		case 'tokyo':
    			settings.image = "gundam";
    			break;
    		case 'jungle':
    			settings.image = "spice_man";
    			break;
    		case 'mountains':
    			settings.image = "moomin";
    			break;
    		case 'hills':
    			settings.image = "he_man";
    			break;
    		case 'tokyo_long':
    			settings.image = sprites[Math.floor(Math.random()*5)];
    			break;
    		case 'space':
    		default:
    			settings.image = "pimp";
    			break;
    	};
    	this.movement = {
			max : settings.movement,
			moved : 0,
			direction: (Math.random() > 0.5) ? 'up' : 'down',
			x : settings.move_x
    	};
    	this.shoot = settings.enemy_shoot;
    	settings.spritewidth = 64;
    	// call the parent constructor
    	this.parent(x, y , settings);
    	this.gravity = 0;
    	this.updateColRect(0,64,0,63);
    	// walking & jumping speed
    	this.setVelocity(4, 6);
    	// make it collidable
    	this.collidable = true;
    	this.type = me.game.ENEMY_OBJECT;
    },	
    onCollision : function (res, obj)
    {
    	if(obj.type == 'player_laser' || obj.type == 'player'){
    		var obj = new ExplosionEntity(this.pos.x + this.width / 2 + this.vel.x,this.pos.y + this.height / 2,{});
    		me.game.add(obj, this.z);
    		me.game.sort();
    		this.die();
    		Director.player.enemyDead();
    	}
    },
    // manage the enemy movement
    update : function ()
    {
    	if(this.pos.x < me.game.viewport.pos.x + me.game.viewport.width){
    		if(this.pasuex){
    			this.vel.x = this.pasuex;
    		} else {
    			this.vel.x = -1;
    			if(this.movement.x){
    				var rand = Math.random()
    				if(rand > 0.98){
    					this.vel.x = -2;
    					this.pasuex = this.vel.x;
    					setTimeout(function(){this.pasuex = false;},300);
    				} else if(rand < 0.02){
    					this.vel.x = 0;
    					this.pasuex = this.vel.x;
    					setTimeout(function(){this.pasuex = false;},300);
    				}
    			}
    		}
    		if(this.movement.max > 0){
    			if(this.movement.direction == 'up'){
    				this.vel.y -= 0.1;
    				this.movement.moved -= 1;
    			} else if(this.movement.direction == 'down'){
    				this.vel.y += 0.1;
    				this.movement.moved += 1;
    			}
    			if(this.movement.moved > this.movement.max || this.movement.moved < -this.movement.max || Math.random() > 0.9){
    				this.movement.direction = (this.movement.direction == 'up') ? 'down' : 'up';
    			}
    		}
    		if(this.shoot.can_shoot){
    			if(!this.pauseGun){
    				this.pauseGun = true;
    				var obj = new LaserEntity(this.pos.x - this.width,this.pos.y + (this.height / 4),{enemy_laser : true});
    				me.game.add(obj, this.z);
    				me.game.sort();
    				setTimeout(function(){this.pauseGun = false;},Number.prototype.random(this.shoot.delay_min,this.shoot.delay_max));
    			}
    		}
    		var res = me.game.collide(this);
    	}
    	if(this.pos.x < me.game.viewport.pos.x - this.width){
    		Director.player.updateScore(-250);
    		me.game.remove(this);
    	}
    	// check & update movement
    	this.updateMovement();
    	if(this.vel.x!=0 ||this.vel.y!=0){
    		// update the object animation
    		this.parent();
    		return true;
    	}
    	return false;
    },
    die : function(){
    	this.alive = false;
    	me.game.remove(this);
    }
});
/****************************************************************************/
/*																			*/
/*		a Boss Entity														*/
/*																			*/
/****************************************************************************/
var BossEntity = me.ObjectEntity.extend(
{
    init : function(x,y,settings)
    {
    	switch(me.levelDirector.getCurrentLevelId()){
    		case 'tokyo':
    			settings.image = "prime";
    			settings.spritewidth = 260;
    			settings.spriteheight = 264;
    			break;
    		case 'jungle':
    			settings.image = "kfc";
    			settings.spritewidth = 488;
    			settings.spriteheight = 368;
    			break;
    		case 'mountains':
    			settings.image = "chris";
                settings.spritewidth = 368;
    			settings.spriteheight = 288;
    			break;
    		case 'hills':
    			settings.image = "leslie-nielsen";
    			settings.spritewidth = 368;
    			settings.spriteheight = 288;
    			break;
    		case 'space':
    		default:
    			settings.image = "space_boss";
    			settings.spritewidth = 384;
    			settings.spriteheight = 256;
    			break;
    	};
    	this.boss = settings.boss;
    	// call the parent constructor
    	this.parent(x, y , settings);
    	this.gravity = 0;
    	this.updateColRect(0,settings.spritewidth,0,settings.spriteheight);
    	// walking & jumping speed
    	this.setVelocity(4, 6);
    	// make it collidable
    	this.collidable = true;
    	this.type = 'boss';
    	this.inPlace = false;
    	this.boss.move_y_dir = (Math.random() > 0.5) ? 'up' : 'down';
    	this.boss.move_y_max = 32;
    	this.boss.move_y_moved = 0;
    	this.boss.move_x_dir = (Math.random() > 0.5) ? 'left' : 'right';
    	this.boss.move_x_max = 32;
    	this.boss.move_x_moved = 0;
    	this.pauseGun = false;
    	this.burstCount = 0;
    	this.bursting = false;
    	this.ytop = 10;
    	this.ybot = this.height - 10; // do we dont get any in the walls
    },
    onCollision : function (res, obj)
    {
    	if(obj.type == 'player_laser'){
    	    this.boss.health--;
    	    if(this.boss.health == 0){
    	    	var obj = new ExplosionEntity(this.pos.x + this.width / 2 + this.vel.x,this.pos.y + this.height / 2,{});
    	    	me.game.add(obj, this.z);
    	    	this.alive = false;
    	    	me.game.remove(this);
    	    	me.game.sort();
    	    	Director.player.updateScore(10000);
    	    	Director.bossDead();
    	    }
    	}
    },
    update : function ()
    {
    	if(!this.inPlace){
    		if(this.pos.x < me.game.viewport.pos.x + me.game.viewport.hWidth){
    			this.inPlace = true;
    			Director.bossInPlace()
    		}
    		this.vel.x = -1;
    	} else {
    		this.vel.x = 1;
    		if(this.boss.move_x){
    			if(this.boss.move_x_dir == 'right'){
    				this.vel.x = 0;
    				this.boss.move_x_moved -= 1;
    			} else if(this.boss.move_x_dir == 'left'){
    				this.vel.x = 2;
    				this.boss.move_x_moved += 1;
    			}
    			if(this.boss.move_x_moved > this.boss.move_x_max || this.boss.move_x_moved < -this.boss.move_x_max || Math.random() > 0.95){
    				this.boss.move_x_dir = (this.boss.move_x_dir == 'right') ? 'left' : 'right';
    			}
    		}
    		if(this.boss.move_y){
    			if(this.boss.move_y_dir == 'up'){
    				this.vel.y -= 0.1;
    				this.boss.move_y_moved -= 1;
    			} else if(this.boss.move_y_dir == 'down'){
    				this.vel.y += 0.1;
    				this.boss.move_y_moved += 1;
    			}
    			if(this.boss.move_y_moved > this.boss.move_y_max || this.boss.move_y_moved < -this.boss.move_y_max || Math.random() > 0.9){
    				this.boss.move_y_dir = (this.boss.move_y_dir == 'up') ? 'down' : 'up';
    			}
    		}
    		if(!this.pauseGun){
    			if(this.bursting){
    				this.burstCount++;
    				if(this.burstCount > 2){
    					this.bursting = false;
    					this.burstCount = 0;
    					this.pauseGun = true;
    					setTimeout(function(obj){obj.pauseGun = false;}, Number.prototype.random(this.boss.shoot_delay+350,this.boss.shoot_delay+600), this);
    				} else {
    					var obj = new LaserEntity(this.pos.x - 32,this.pos.y + Number.prototype.random(100, this.height - 100) ,{enemy_laser : true});
    					me.game.add(obj, this.z);
    					setTimeout(function(obj){obj.pauseGun = false;}, Number.prototype.random(200), this);
    				}
    			} else {
    				if(this.boss.burst && Math.random() > 0.96){
    					this.bursting = true;
    				} else {
    					this.pauseGun = true;
    					var obj = new LaserEntity(this.pos.x - 32,this.pos.y + Number.prototype.random(this.ytop, this.ybot) ,{enemy_laser : true});
    					me.game.add(obj, this.z);
    					setTimeout(function(obj){obj.pauseGun = false;}, Number.prototype.random(this.boss.shoot_delay-50,this.boss.shoot_delay+100), this);
    				}
    			}
    			me.game.sort();
    		}
    	}
    	var res = me.game.collide(this);
    	// check & update movement
    	this.updateMovement();	
    	if(this.vel.x!=0 ||this.vel.y!=0){
    		// update the object animation
    		this.parent();
    		return true;
    	}
    	return false;
    },
});
/****************************************************************************/
/*																			*/
/*		The Score HUD item													*/
/*																			*/
/****************************************************************************/
var ScoreObject = me.HUD_Item.extend(
{	
    init: function(x, y)
    {
    	// call the parent constructor
    	this.parent(x, y);
    	// create a font
    	this.font = new me.BitmapFont("font_32px", 32);
    },
    draw : function (context, x, y)
    {
    	this.font.draw (context, Director.player.getScore(), this.pos.x +x, this.pos.y+y);
    }
});
/****************************************************************************/
/*																			*/
/*		The Health HUD item													*/
/*																			*/
/****************************************************************************/
var HealthObject = me.HUD_Item.extend(
{	
    init: function(x, y)
    {
    	// call the parent constructor
    	this.parent(x, y);
    	// create a font
    	this.font = new me.BitmapFont("font_32px", 32);
    	this.font.set('left');
    	this.value = me.game.health;
    },
    draw : function (context, x, y)
    {
    	this.value = me.game.health;
    	this.font.draw (context, '%' + Director.player.getHealth(), this.pos.x, this.pos.y);
    }
});
/****************************************************************************/
/*																			*/
/*		The Lives HUD item													*/
/*																			*/
/****************************************************************************/
var LivesObject = me.HUD_Item.extend(
{	
    init: function(x, y)
    {
    	// call the parent constructor
    	this.parent(x, y);
    	// create a font
    	this.font = new me.BitmapFont("font_32px", 32);
    	this.font.set('left');
    	this.value = me.game.lives;
    },
    draw : function (context, x, y)
    {
    	this.value = me.game.lives;
    	this.font.draw (context, '#' + Director.player.getLives(), this.pos.x, this.pos.y);
    }
});