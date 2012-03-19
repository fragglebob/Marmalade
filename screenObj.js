/* -----

	gameScreens
		
	------			*/


/*---------------------------------------------------------------------

	A title screen

  ---------------------------------------------------------------------	*/

var TitleScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		
		// title screen image
		this.title         = null;
		
		this.font          =  null;
	},
	/* ---
		reset function
	   ----*/
	
	onResetEvent : function()
	{
		if (this.title == null)
		{
			// init stuff if not yet done
			this.title = me.loader.getImage("title_screen");
			// font to display the menu items
			this.play = new me.BitmapFont("font_32px", 32);
			this.play.set("left");
            this.score = this.play;
            this.sector = this.play;
            
            this.sections = ['play','scores'];
            this.selection = 0;
            
            this.sectorpos = 280 + (this.selection * 40);
						
		}
      
        me.audio.playTrack("theme");
		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "select", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
		// play something
		
	},
	

		
	/*---
		
		update function
		 ---*/
		
	update : function()
	{
		var update = false
        // enter pressed ?
        if (me.input.isKeyPressed('up'))
		{
			if(this.selection > 0){
                this.selection--;
            }
            update = true;
		}
        if (me.input.isKeyPressed('down'))
		{
			if(this.selection < this.sections.length - 1){
                this.selection++;
            }
            update = true;
		}
        this.sectorpos = 280 + (this.selection * 40);
		if (me.input.isKeyPressed('select'))
		{
			//switch (this.sections[this.selection])
            me.state.change(me.state.PLAY);
            update = true;
		}
        if(update){
            return true;
        }
        return false;
	},

	
	/*---
	
		the manu drawing function
	  ---*/
	
	draw : function(context)
	{
		context.drawImage(this.title, 0,0);
		
		this.play.draw (context, "PLAY", 240, 280);
        this.score.draw (context, "SCORES", 240, 320);
        this.sector.draw (context, ">", 200, this.sectorpos);
	},
	
	/*---
	
		the manu drawing function
	  ---*/
	
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.DOWN);
		
   },

});
var GameOverScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		
		this.background		= null;
		
		this.font			= null;
		
	},
	/* ---
		reset function
	   ----*/
	
	onResetEvent : function()
	{
      	if(this.font === null){
      		this.background = me.loader.getImage("game_over_screen");
      		this.left = new me.BitmapFont("font_32px", 32);
      		this.left.set("left");
      		this.right = new me.BitmapFont("font_32px", 32);
      		this.right.set("right");
      	}
		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		// play something
		
	},
	

		
	/*---
		
		update function
		 ---*/
		
	update : function()
	{
		if (me.input.isKeyPressed('enter'))
		{
			me.state.change(me.state.MENU);
		}
	},

	
	/*---
	
		the manu drawing function
	  ---*/
	
	draw : function(context)
	{
		context.drawImage(this.background, 0,0);
		
		this.left.draw (context, "GAME OVER", 180, 100);
		
		this.right.draw (context, "SCORE:", 380, 160);
		this.left.draw (context, Director.player.getScore(), 400, 160);
		
		this.right.draw (context, "SHOTS:", 380, 200);
		this.left.draw (context, Director.player.getShotsTaken(), 400, 200);
		
		this.right.draw (context, "MISSED:", 380, 240);
		this.left.draw (context, Director.player.getShotsMissed(), 400, 240);
		
		this.right.draw (context, "KILLED:", 380, 280);
		this.left.draw (context, Director.player.getEnemiesKilled(), 400, 280);
		
	},
	
	/*---
	
		the manu drawing function
	  ---*/
	
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
		this.left = null;
		this.right = null;
		Director.player.reset();
	},

});

// create a custom loading screen
var MainLoadingScreen = me.ScreenObject.extend(
{
   // constructor
   init: function()
   {
      // pass true to the parent constructor
      // as we draw our progress bar in the draw function
      this.parent(true);
      // flag to know if we need to refresh the display
      this.invalidate = false;
      // load progress in percent
      this.loadPercent = 0;
      // setup a callback
      me.loader.onProgress = this.onProgressUpdate.bind(this);

   },
   onResetEvent : function(){
        this.logo = new me.BitmapFont("font_32px", 32);
   },
   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress)
   {
      this.loadPercent = progress;
      this.invalidate = true;
   },

  
   // make sure the screen is only refreshed on load progress 
   update: function()
   {
      if (this.invalidate===true)
      {
         // clear the flag
         this.invalidate = false;
         // and return true
         return true;
      }
      // else return false
      return false;
   },

   // on destroy event
   onDestroyEvent : function ()
   {
      // "nullify" all fonts
      this.logo = null;
   },

   //	draw function
   draw : function(context)
   {
      // clear the screen
      me.video.clearSurface (context, "black");

      // draw our text somewhere in the middle
      this.logo.draw(context, 
                     "LOADING!", 
                     (context.canvas.width + 256) / 2, 
                     context.canvas.height / 2);
  
      // display a progressive loading bar
      var width = Math.floor(this.loadPercent * context.canvas.width);
    
      // draw the progress bar
      context.fillStyle = "#FFFFFF";
      context.fillRect(2, (context.canvas.height / 2) + 42, width-4, 20);
   },
});
var FirstLoadingScreen = me.ScreenObject.extend(
{
   // constructor
   init: function()
   {
      // pass true to the parent constructor
      // as we draw our progress bar in the draw function
      this.parent(true);
      // flag to know if we need to refresh the display
      this.invalidate = false;
      // load progress in percent
      this.loadPercent = 0;
      // setup a callback
      me.loader.onProgress = this.onProgressUpdate.bind(this);

   },
   onResetEvent : function(){
   	this.logo = new me.Font('Andale Mono', 32, 'white');
   },
   // will be fired by the loader each time a resource is loaded
   onProgressUpdate: function(progress)
   {
      this.loadPercent = progress;
      this.invalidate = true;
   },

  
   // make sure the screen is only refreshed on load progress 
   update: function()
   {
      if (this.invalidate===true)
      {
         // clear the flag
         this.invalidate = false;
         // and return true
         return true;
      }
      // else return false
      return false;
   },

   // on destroy event
   onDestroyEvent : function ()
   {
      // "nullify" all fonts
      this.logo = null;
   },

   //	draw function
   draw : function(context)
   {
      // clear the screen
      me.video.clearSurface (context, "black");

      // measure the logo size
      logo_width = this.logo.measureText(context,"LOADING!").width;

      // draw our text somewhere in the middle
      this.logo.draw(context, 
                     "LOADING!", 
                     ((context.canvas.width - logo_width) / 2), 
                     (context.canvas.height + 60) / 2);
  
      // display a progressive loading bar
      var width = Math.floor(this.loadPercent * context.canvas.width);
    
      // draw the progress bar
      context.fillStyle = "#FFFFFF";
      context.fillRect(2, (context.canvas.height / 2) + 42, width-4, 20);
   },
});
