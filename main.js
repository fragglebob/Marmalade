var Director = {
	levels : ['space','space_boss','jungle','jungle_boss','mountains','mountains_boss','tokyo','tokyo_boss','hills','hills_boss'], // in play order
	init_resources : [  
		{name: "title_screen",		type:"image",	src: "data/GUI/title_screen.png"},
		{name: "game_over_screen",	type:"image",	src: "data/GUI/game_over.png"},
		{name: "font_32px",			type:"image",	src: "data/font_32px.png"},
		{name: "marmalade",			type:"image",	src: "data/sprite/marmalade-sprite-64px.png"},
		{name: "explosion",			type:"image",	src: "data/sprite/explosion-sprite-64px.png"},
    	{name: "laser",				type:"image",	src: "data/sprite/laser.png"},
        {name: "boom",				type:"audio",	src: "data/audio/",	channel : 2},
        {name: "bleep",				type:"audio",	src: "data/audio/",	channel : 2},
        {name: "theme",             type:"audio",	src: "data/music/",	channel : 2},
	],
	level_resources : {
		space : [
            {name: "space",				type:"tmx",		src: "data/space.tmx"},
    		{name: "space-parallax-1",	type:"image",	src: "data/space_parallax/space-parallax-1.png"},
    		{name: "space-parallax-2",	type:"image",	src: "data/space_parallax/space-parallax-2.png"},
    		{name: "pimp",				type:"image",	src: "data/sprite/pimp-sprite-64px.png"},
            {name: "space_boss",        type:"image",	src: "data/sprite/space-boss-sprite.png"},
		],
		tokyo : [
            {name: "tokyo",		type:"tmx",		src: "data/tokyo.tmx"},
    		{name: "tokyo_1",	type:"image",	src: "data/tokyo_parallax/tokyo_1.png"},
    		{name: "tokyo_2",	type:"image",	src: "data/tokyo_parallax/tokyo_2.png"},
			{name: "tokyo_3",	type:"image",	src: "data/tokyo_parallax/tokyo_3.png"},
			{name: "prime",		type:"image",	src: "data/sprite/prime.png"}, 	
			{name: "gundam",	type:"image",	src: "data/sprite/gundam-64px.png"},
		],
		tokyo_long : [
            {name: "tokyo_long",type:"tmx",		src: "data/tokyo_long.tmx"},
    		{name: "tokyo_1",	type:"image",	src: "data/tokyo_parallax/tokyo_1.png"},
    		{name: "tokyo_2",	type:"image",	src: "data/tokyo_parallax/tokyo_2.png"},
			{name: "tokyo_3",	type:"image",	src: "data/tokyo_parallax/tokyo_3.png"},
			{name: "pimp",		type:"image",	src: "data/sprite/pimp-sprite-64px.png"},
			{name: "gundam",	type:"image",	src: "data/sprite/gundam-64px.png"},
			{name: "he_man",	type:"image",	src: "data/sprite/he-man-sprite.png"},
			{name: "spice_man",	type:"image",	src: "data/sprite/spice-man-64px.png"},
			{name: "moomin",	type:"image",	src: "data/sprite/moomin-sprite.png"},
		],
		jungle : [
            {name: "jungle",			type:"tmx",		src: "data/jungle.tmx"},
    		{name: "jungle-parallax-1",	type:"image",	src: "data/jungle_parallax/jungle-1.png"},
    		{name: "jungle-parallax-2",	type:"image",	src: "data/jungle_parallax/jungle-2.png"},
    		{name: "jungle-parallax-3",	type:"image",	src: "data/jungle_parallax/jungle-3.png"},
            {name: "kfc",               type:"image",	src: "data/sprite/kfc-sprite.png"},
    		{name: "spice_man",			type:"image",	src: "data/sprite/spice-man-64px.png"},
		],
		hills : [
            {name: "hills",				type:"tmx",		src: "data/hills.tmx"},
    		{name: "hills-parallax-1",	type:"image",	src: "data/hills_parallax/hills_1.png"},
    		{name: "hills-parallax-2",	type:"image",	src: "data/hills_parallax/hills_2.png"},
    		{name: "hills-parallax-3",	type:"image",	src: "data/hills_parallax/hills_3.png"},
    		{name: "hills-parallax-4",	type:"image",	src: "data/hills_parallax/hills_4.png"},
    		{name: "he_man",			type:"image",	src: "data/sprite/he-man-sprite.png"},
    		{name: "leslie-nielsen",	type:"image",	src: "data/sprite/leslie-nielsen.png"},
		],
		mountains : [
            {name: "mountains",				type:"tmx",		src: "data/mountains.tmx"},
    		{name: "mountains-parallax-1",	type:"image",	src: "data/mountains_parallax/mountains-1.png"},
    		{name: "mountains-parallax-2",	type:"image",	src: "data/mountains_parallax/mountains-2.png"},
    		{name: "mountains-parallax-3",	type:"image",	src: "data/mountains_parallax/mountains-3.png"},
    		{name: "moomin",				type:"image",	src: "data/sprite/moomin-sprite.png"},
            {name: "chris",				type:"image",	src: "data/sprite/chris-sprite.png"},
		],
	},
    level_settings : {
        space : {
            stages : [
                { x : 0,    difficulty : 1, },
                { x : 2300, difficulty : 2, },
            ],
            tmx : 'space',
            song : 'theme',
        },
        space_boss : { 
            stages : [ 
                { x : 0,    difficulty : 2, },
            ],
            tmx : 'space',
            song : 'theme',
            boss : true, 
        },
        jungle : {
            stages : [
                { x : 0,    difficulty : 3, },
                { x : 2300, difficulty : 4, },
            ],
            tmx : 'jungle',
            song : 'theme',
        },
        jungle_boss : {
            stages : [
                { x : 0,    difficulty : 4, },
            ],
            tmx : 'jungle',
            song : 'theme',
            boss : true, 
        },
        mountains : {
        	stages : [
                { x : 0,    difficulty : 5, },
                { x : 2300, difficulty : 6, },
            ],
            tmx : 'mountains',
            song : 'theme',
        },
        mountains_boss : {
            stages : [
                { x : 0,    difficulty : 6, },
            ],
            tmx : 'mountains',
            song : 'theme',
            boss : true, 
        },
        tokyo : {
            stages : [
                { x : 0,    difficulty : 7, },
                { x : 2300, difficulty : 8, },
            ],
            tmx : 'tokyo',
            song : 'theme',
        },
        tokyo_boss : {
            stages : [
                { x : 0,    difficulty : 8, },
            ],
            tmx : 'tokyo',
            song : 'theme',
            boss : true,
        },
        hills : {
        	stages : [
                { x : 0,    difficulty : 9, },
                { x : 2300, difficulty : 10, },
            ],
            tmx : 'hills',
            song : 'theme',
        },
        hills_boss : {
        	stages : [
                { x : 0,    difficulty : 10, },
            ],
            tmx : 'hills',
            song : 'theme',
            boss : true, 
        },
        tokyo_extreme : {
            stages : [
                { x : 0,    difficulty : 9000, },
            ],
            tmx : 'tokyo_long',
            song : 'theme',
        },
    },
    difficty_settings : {
    	1 : {
    		multiple_poss : [0.99],
    		enemy_move : false,
    	},
    	2 : {
    		multiple_poss : [0.9],
    		enemy_move : 12,
    		boss : {
    			move_x : false,
    			move_y : true,
    			health : 50,
    			aims : false,
    			shoot_delay : 600,
    			burst : false,
    		}
    	},
    	3 : {
    		multiple_poss : [0.83,0.94],
    		enemy_move : 24,
    	},
    	4 : {
    		multiple_poss : [0.84,0.87,0.99],
    		enemy_move : 32,
    		enemy_move_x : 0.3,
            boss : {
    			move_x : true,
    			move_y : true,
    			health : 95,
    			aims : false,
    			shoot_delay : 550,
    			burst : false,
    		}
    	},
    	5 : {
    		multiple_poss : [0.7,0.8,0.9,0.99],
    		enemy_move : 42,
    		enemy_move_x : 0.8,
    	},
    	6 : {
    		multiple_poss : [0.7,0.8,0.9,0.99],
    		enemy_move : 56,
    		enemy_move_x : 1,
    		enemy_shoot : {
    			can_shoot : true,
    			delay_min : 600,
    			delay_max : 2000,
                count : 0.3,
    		},
            boss : {
    			move_x : true,
    			move_y : true,
    			health : 150,
    			aims : false,
    			shoot_delay : 470,
    			burst : false,
    		}
    	},
    	7 : {
    		multiple_poss : [0.7,0.8,0.9,0.95,0.99],
    		enemy_move : 56,
    		enemy_move_x : 1,
    		enemy_shoot : {
    			can_shoot : true,
    			delay_min : 600,
    			delay_max : 1400,
                count : 0.4,
    		}
    	},
    	8 : {
    		multiple_poss : [0.6,0.7,0.8,0.9,0.93,0.99],
    		enemy_move : 56,
    		enemy_move_x : 1,
    		enemy_shoot : {
    			can_shoot : true,
    			delay_min : 600,
    			delay_max : 1400,
                count : 0.7,
    		},
            boss : {
    			move_x : true,
    			move_y : true,
    			health : 250,
    			aims : false,
    			shoot_delay : 450,
    			burst : false,
    		}
    	},
    	9 : {
    		multiple_poss : [0.5,0.6,0.7,0.8,0.9,0.95,0.99],
    		enemy_move : 56,
    		enemy_move_x : 1,
    		enemy_shoot : {
    			can_shoot : true,
    			delay_min : 500,
    			delay_max : 1000,
                count : 0.8,
    		}
    	},
    	10 : {
    		multiple_poss : [0.4,0.5,0.6,0.7,0.8,0.9,0.93,0.95,0.99],
    		enemy_move : 56,
    		enemy_move_x : 1,
    		enemy_shoot : {
    			can_shoot : true,
    			delay_min : 400,
    			delay_max : 800,
                count : 1,
    		},
    		boss : {
    			move_x : true,
    			move_y : true,
    			health : 300,
    			aims : true,
    			shoot_delay : 400,
    			burst : true,
    		}
    	},
    	9000 : {
    		multiple_poss : [0.15,0.3,0.45,0.6,0.75,0.9,0.95,0.97,0.99],
    		enemy_move : 64,
    		enemy_move_x : 1,
    		enemy_shoot : {
    			can_shoot : true,
    			delay_min : 300,
    			delay_max : 900,
                count : 1,
    		}
    	},
    },
    // array of loaded tmxs and there files
	levels_loaded : [],
    // the current level being played
	current_level : false,
    // if the init function has been run
	initialized : false,
    // if the game is playing
	playing : false,
    // if we are in the middle of loading
	loading : false,
    // after the load function we should run the next level or prev level
	next_level : false,
	prev_level : false,
    
    // used to pause the viewport from scrolling
    stopTimeout : false,
    // skip adding enemys for this value
   	enemySkip : false,
    // timeout used when you kill a boss
   	nextTimeout : false,
    // if the boss is in place during a boss battle
   	boss_in_place : false,
    // if the current level is a boss battle
   	boss_fight : false,
   	// the major init function for everything, this gets the everything rolling 
	init : function(){
        // check if we have run this so we dont run you twice
		if(!Director.initialized){
            // init the video
			if (!me.video.init('jsapp', 640, 480)) {
				alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
				return;
			}
            // debug for hit boxes
            // me.debug.renderHitBox = true;
            // init audio
			me.audio.init("mp3,ogg");
            // set the loaded callback
			me.loader.onload = Director.loaded.bind(Director);
            // set the loading screen to the basic one that we can use before anything is loaded
        	me.state.set(me.state.LOADING, new FirstLoadingScreen());
            // lets load the games main resources
			me.loader.preload(Director.init_resources);
            // load the resources from the first level
			me.loader.preload(Director.level_resources[Director.level_settings[Director.levels[0]].tmx]);
            // set loading to true as thats what we are doing
			Director.loading = true;
            // set the say that the tmx has been loaded
			Director.levels_loaded.push(Director.level_settings[Director.levels[0]].tmx);
            // state is loading
			me.state.change(me.state.LOADING);
            // set initialized to true so we dont run this again
			Director.initialized = true;
		}
	},
	loaded : function(){
        // set loading to false so we can play some games
		Director.loading = false;
		// set the callback to use from now on
		me.loader.onload = Director.levelLoaded.bind(Director);
        // set up the screens with there states
		me.state.set(me.state.MENU, new TitleScreen());
		me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.LOADING, new MainLoadingScreen());
        me.state.set(me.state.GAMEOVER, new GameOverScreen());
        // add the transition for all the states
		me.state.transition("fade", "#FFFFFF", 250);
        // add the entities to the entity pool
		me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("autoScroll", ScrollEntity);
        // change the state to menu so we have the main menu for the user.
		me.state.change(me.state.MENU);
	},
	play : function(){
        // only play if we are are not loading or playing, and we have initialized the game
		if(!Director.loading && !Director.playing && Director.initialized){
            // stop menu audio
            me.audio.stopTrack();
            // set playing variable to true
			Director.playing = true;
            // if we have no current level set play the first level
            // else if the next level is set we load the next level and reset next level to default
            // else if the prev level is set we load the previous level and reset prev level to default
			if(Director.current_level === false){
				Director.current_level = 0;
			} else if(Director.next_level){
                Director.next_level = false;
				Director.current_level = Director.current_level+1;
			} else if(Director.prev_level){
                Director.prev_level = false;
				Director.current_level = Director.current_level-1;
			}
            // get the current settings for the level we are about to play
            Director.current_settings = Director.level_settings[Director.levels[Director.current_level]];
            // if this is a boss fight we set this.
            if(Director.current_settings.boss){ Director.boss_fight = true; }
            // load the the tmx to play
            me.levelDirector.loadLevel(Director.current_settings.tmx);
            // we are playing the first stage of cousre 
            Director.current_stage_key = 0;
            Director.current_stage = Director.current_settings.stages[Director.current_stage_key];
            // lets generate all the enemies for the level
            Director.generateEnemies();
            // get the current levels song playing
            me.audio.playTrack(Director.current_settings.song);
		}
	},
	next : function(){
        // clear any timeout set to run this function so it doesn't run twice
		clearTimeout(Director.nextTimeout);
		Director.nextTimeout = false;
        // if last level
		if(Director.current_level+1 == Director.levels.length){
			return;
		}
        // if we are playing 
		if(Director.playing){
            // set playing to flase as we are going to to be loading a new level
			Director.playing = false;
            // make sure the next level parts of functions are now working
			Director.next_level = true;
            // if we have already loaded the tmx load it otherwise go straight to playing it
			if(Director.levels_loaded.indexOf(Director.level_settings[Director.levels[Director.current_level+1]].tmx) == '-1' && !Director.loading){
                // load the level resources for the next level
				me.loader.preload(Director.level_resources[Director.level_settings[Director.levels[Director.current_level+1]].tmx]);
                // we are loading now, yay
				Director.loading = true;
                Director.levels_loaded.push(Director.level_settings[Director.levels[Director.current_level+1]].tmx);
				me.state.change(me.state.LOADING);
			} else {
                // state to playing staight back to the action 
				me.state.change(me.state.PLAY);
			}
		}
	},
	levelLoaded : function(){
        // done loading
		Director.loading = false;
        // back to playing now
		me.state.change(me.state.PLAY);
	},
    /*
     * Hear we take the position of the viewport passed in as x
     * so we can update the current_stage variable 
     * returns: false when last stage and a number of the next stages x start
     */
    updateStage : function(x){
        // loop though stages from the current_stage_key to save tim
        for(var i = Director.current_stage_key; i < Director.current_settings.stages.length; i++){
            // check if the viewports x is bigger than the stages x
            if(x >= Director.current_settings.stages[i].x){
                // if last stage
                // else if viewports x is smaller than the next stages x, we have what we want
                if((i + 1) == Director.current_settings.stages.length){
                    Director.current_stage = Director.current_settings.stages[i];
                    Director.current_stage_key = i;
                    return false;
                } else if(x < Director.current_settings.stages[i+1].x){
                    Director.current_stage = Director.current_settings.stages[i];
                    Director.current_stage_key = i;
                    return Director.current_settings.stages[i+1].x;
                }
            }
        }
    },
    currentStage : function(){
        return Director.current_stage;
    },
    /*
     * Finds that stage at x and returns it
     */
    getStageAt : function(x){
    	for(var i = 0; i < Director.current_settings.stages.length; i++){
            if(x >= Director.current_settings.stages[i].x){
                if((i + 1) == Director.current_settings.stages.length){
                    return Director.current_settings.stages[i];
                } else if(x < Director.current_settings.stages[i+1].x){
                    return Director.current_settings.stages[i];
                }
            }
        }
    },
    stop : function(x){
        if(Director.current_stage.x == x || Director.stopTimeout){
            if(Director.stopTimeout === false){
                Director.stopTimeout = setTimeout(function(){Director.stopTimeout = true;}, 1000);
            }
            if(Director.stopTimeout === true){
                Director.stopTimeout = false;
                return 1;
            }
            return 0;  
        }
        return 1;
    },
    /*
     * Lays out all the enemies for the level
     */
    generateEnemies : function(){
        // lets set some valiables that we are going to be using a lot
    	var vWidth = me.game.viewport.width,
    		lWdith = me.game.currentLevel.realwidth,
    		skipInc = 0;
        // if the current level is not a boss level
    	if(!Director.current_settings.boss){
            // loop for every pixel on the x of the level skiping beginning and end
        	for(var i = vWidth ; i < lWdith - (vWidth / 2); i++){
                // we are not skiping this pixel so run this else add to the count
        		if(Director.enemySkip === false){
                    // get the stage and difficulty at this pixel
        			var stage = Director.getStageAt(i - vWidth);
        			var difficulty = Director.difficty_settings[stage.difficulty];
                    // set the difficulty id in the difficulty object
        			difficulty.id = stage.difficulty;
                    // set the enemySkip count
        			// Director.enemySkip = Number.prototype.random(difficty.delay.min,difficty.delay.max);
        			Director.enemySkip = Number.prototype.random(30,40);
                    // set the random here as it can run lots of times depending of the diffuculty 
        			var rand = Math.random();
                    // loop the multiple_poss to add extra enemies here
    		    	for(var k = 0; k < difficulty.multiple_poss.length; k++){
    		    		if(rand > difficulty.multiple_poss[k]){
                            // add extra enemy with random posistion between this and the next pixel
    		    			Director.addEnemies(i + (Math.random() * Director.enemySkip), difficulty);
    		    		}
    		    	}
                    // add the enemy for this pixel
    		    	Director.addEnemies(i, difficulty);
			    } else {
			    	if(skipInc < Director.enemySkip){
                        // we haven't met the skip number yet so add one to the count
			    		skipInc++;
			    	} else {
                        // we made the count so reset those so we can add some more
			    		Director.enemySkip = false;
			    		skipInc = 0;
			    	}
			    }
			}
		} else {
            // we need the difficulty for this level
			var stage = Director.getStageAt(0);
        	var difficulty = Director.difficty_settings[stage.difficulty];
        	difficulty.id = stage.difficulty;
            // add the boss for this level, rawr
			Director.addBoss(vWidth, difficulty);
		}
        // finally lets sort out this layers
		me.game.sort();
    },
    /*
     * we are going to add an enemy yay
     * x = x pos
     * d = difficulty object
     */
    addEnemies : function(x,d){
        // start with these simple settings
        var settings = {
            difficulty : d.id,
            movement: d.enemy_move || 0,
            move_x: false,
        }
        // randomly choose the y pos for the enemy
    	var y = Number.prototype.random(64,400);
        // if enemy_move_x is not 1
    	if(d.enemy_move_x != 1){
            // if random is bigger we add x movement to the enemy
    		if(Math.random() < d.enemy_move_x){
    			settings.move_x = true;
    		}
    	} else {
            // else must be 1 so add anyways
            settings.move_x = true;
        }
        // if enemy shoot undefined we need to set it to false
    	if(d.enemy_shoot == undefined){
    		settings.enemy_shoot = { can_shoot : false };
    	} else {
            // else we set some value for enemy
            settings.enemy_shoot = {
                    can_shoot : d.enemy_shoot.can_shoot,
                    delay_min : d.enemy_shoot.delay_min,
                    delay_max : d.enemy_shoot.delay_max,
                    count : d.enemy_shoot.count,
            };
            // if count is not set all are going to shoot else do this
            if(settings.enemy_shoot.count != undefined){
                // if random is bigger this enemy cant shoot
                if(Math.random() > d.enemy_shoot.count){
                    settings.enemy_shoot = { can_shoot : false };
                }
            }
        }
        // make the enemy oject with all this shit we have just made
    	var obj = new EnemyEntity(x, y, settings);
        // add to the game
    	me.game.add(obj, 7);
        // then we return y just in case we want to use it
    	return y;
    },
    addBoss : function(x,d){
    	var obj = new BossEntity(x, me.game.viewport.hHeight + 120, { 
            difficulty : d.id, 
            boss : {
    			move_x : d.boss.move_x,
    			move_y : d.boss.move_y,
    			health : d.boss.health,
    			aims : d.boss.aims,
    			shoot_delay : d.boss.shoot_delay,
    			burst : d.boss.burst,
    		}
        });
    	me.game.add(obj, 7);
    },
    isBossFight : function(){
    	return Director.boss_fight;
    },
    isBossInPlace : function(){
    	return Director.boss_in_place;
    },
    bossInPlace : function(){
    	Director.boss_in_place = true;
    },
    bossDead : function(){
    	Director.boss_fight = false;
    	Director.boss_in_place = false;
    	Director.nextTimeout = setTimeout(Director.next,300);
    },
}
Director.player = (function()
{
    obj = {}
    lives = 3;
    health = 100;
    score = 0;
    shots_fired = 0;
    shots_missed = 0;
    enemies_killed = 0;
    tokyo_extreme = false;
    orginal_levels = Director.levels;
    function isNumber(n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}
    obj.laserShot = function(){
    	shots_fired++;
    }
    obj.laserMiss = function(){
    	shots_missed++;
    }
    obj.takeLifes = function(n){
    	if(isNumber(n)){
    		lives -= n;
    		me.game.HUD.updateItemValue("lives");
    		if(lives < 1){
    			Director.playing = false;
    			me.state.change(me.state.GAMEOVER);
    			return false;
    		}
    		return true;
    	}
    }
    obj.setHealth = function(n){
    	if(isNumber(n)){
    		health = n;
    		me.game.HUD.updateItemValue("health");
    	}
    }
    obj.takeHealth = function(n){
    	if(isNumber(n)){
    		health -= n;
    		me.game.HUD.updateItemValue("health");
    		if(health < 1){
    			return true;
    		}
    		return false;
    	}
    }
    obj.updateScore = function(n){
    	if(isNumber(n)){
    		me.game.HUD.updateItemValue("score");
    		score += n;
    	}
    	return score;
    }
    obj.enemyDead = function(){
    	enemies_killed++;
    }
    obj.getScore = function(){
    	return score;
    }
    obj.getHealth = function(){
    	return health;
    }
    obj.getLives = function(){
    	return lives;
    }
    obj.getShotsTaken = function(){
    	return shots_fired;
    }
    obj.getShotsMissed = function(){
    	return shots_missed;
    }
    obj.getEnemiesKilled = function(){
    	return enemies_killed;
    }
    obj.reset = function(){
    	lives = 3;
    	health = 100;
    	score = 0;
    	shots_fired = 0;
    	shots_missed = 0;
    	enemies_killed = 0;
        Director.current_level = false;
        if(tokyo_extreme){
        	Director.levels = orginal_levels;
        }
    }
    obj.tokyoExtreme = function(){
    	if(!tokyo_extreme && !Director.playing && !Director.loading){
    		Director.levels = ['tokyo_extreme'];
    		tokyo_extreme = true;
    		if(Director.levels_loaded.indexOf(Director.level_settings['tokyo_extreme'].tmx) == '-1' && !Director.loading){
                // load the level resources for the next level
				me.loader.preload(Director.level_resources[Director.level_settings['tokyo_extreme'].tmx]);
                // we are loading now, yay
				Director.loading = true;
                Director.levels_loaded.push(Director.level_settings['tokyo_extreme'].tmx);
				me.state.change(me.state.LOADING);
			} else {
                // state to playing staight back to the action 
				me.state.change(me.state.PLAY);
			}
    	}
    }
    return obj;
})();
var PlayScreen = me.ScreenObject.extend(
{
	onResetEvent: function()
	{	
		// lets bind some keys
		me.input.bindKey(me.input.KEY.LEFT,		"backward");
		me.input.bindKey(me.input.KEY.RIGHT,	"forward");
		me.input.bindKey(me.input.KEY.UP,		"up");
		me.input.bindKey(me.input.KEY.DOWN,		"down");
        me.input.bindKey(me.input.KEY.SPACE,	"fire", true);
      	// tell the Director we are ready to play and to load the level
      	Director.play();
		// add a default HUD to the game mngr
		me.game.addHUD(0,430,640,60);
		// add a new HUD item ff
		me.game.HUD.addItem("score", new ScoreObject(620,10));
		me.game.HUD.addItem("health", new HealthObject(20,10));
		me.game.HUD.addItem("lives", new LivesObject(200,10));
		// make sure everyhting is in the right order
		me.game.sort();
	},
	onDestroyEvent: function()
	{  
		// remove the HUD
		me.game.disableHUD();
		// stop the current audio track
		me.audio.stopTrack();
		// unbind them keys
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.SPACE);
   }
});
window.onReady(function() 
{
	Director.init();
	konami = new Konami();
	konami.code = function() {
		Director.player.tokyoExtreme();
	}
	konami.load()
});