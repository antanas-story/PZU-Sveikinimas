// DOM loads
$(document).ready(function() {
	var snowOpts = { shadow: true, round: true, minSize: 7, maxSize:10 };
	//$("#container").snowfall(snowOpts);
	$(window).resize();
});

// Everything else loads
$(window).load(function() {
	var settings = {
		comet: {
			when: 1500,
			fadeInSpeed: 800,
			moveDuration:2000,
			moveExp: 4,
			fadeOutSpeed:1000,
			startPos: { x:1324, y:170 }
		}
	};
	
	__init(settings);
}).resize(function() {
	var win = $(window);
	var winWidth = win.width();
	var winHeight = win.height();
	var canvas = document.getElementById('canvas');
	var goodRatio = canvas.width / canvas.height;
	var currentRatio = winWidth / winHeight;
	var newW, newH;  
	
	if(currentRatio > goodRatio) {
		newH = (winHeight - 20);
		newW = newH * goodRatio; 
	} else {
		newW = (winWidth - 20);
		newH = newW / goodRatio;
	}
	 
	canvas.style.width = newW + "px";
	canvas.style.height = newH + "px";
	canvas.style.top = ((winHeight - newH) / 2) + "px";
	console.log("resize", newW, newH, winWidth, winHeight);
});

function __init(settings) {
	//CAAT.DEBUG=1;
	var director = new CAAT.Director()
		.initialize(
	        1920,
	        1080,
	        document.getElementById('canvas'))
		.enableResizeEvents(CAAT.Director.prototype.RESIZE_PROPORTIONAL);
    /*new CAAT.ImagePreloader().loadImages(
        [
             {id:'border',    url:'imgs/border.png'},
             {id:'comet',    url:'imgs/comet.png'},
             {id:'logo',    url:'imgs/logo.png'},
             {id:'main',    url:'imgs/main.png'},
             {id:'seniai',    url:'imgs/seniai.png'},
             {id:'tree-toy',    url:'imgs/tree-toy.png'}
        ],
        function( counter, images ) {
			console.log(counter, images);			
			if(counter >= images.length) {
	            director.setImagesCache(images);*/
	            __scene(director, settings);
			/*}
        }
    );	*/
}

function __scene(director, settings) {
	var elems = {};
	var images = [
		document.getElementById('comet'),
		document.getElementById('seniai')
	];
	// Make images into sprites for CAAT
	var sprites = {
		comet: new CAAT.SpriteImage().initialize(document.getElementById('comet'), 1, 1),
		seniai: new CAAT.SpriteImage().initialize(document.getElementById('seniai'), 1, 1),
		/*main: new CAAT.SpriteImage().initialize(director.getImage('main'), 1, 1),
		logo: new CAAT.SpriteImage().initialize(director.getImage('logo'), 1, 1),
		border: new CAAT.SpriteImage().initialize(director.getImage('border'), 1, 1),*/
	};
	
	// Create the scene
	var scene = director.createScene();
	
	// Initiate ector elements on the scene
    elems.comet = new CAAT.Actor()
    	.setBackgroundImage(sprites.comet, true)
    	.setAlpha(0);
	showComet(elems.comet, settings.comet.when, settings);
    elems.seniai = new CAAT.Actor()
    	.setBackgroundImage(sprites.seniai, true);
    	
	var addSpriteToScene = function(key,val) {
		scene.addChild(new CAAT.Actor().setBackgroundImage(val, true));
	};            
	
    //$.each(bottomLayerSprites, addSpriteToScene);
    //$.each(topLayerSprites, addSpriteToScene);
    	
    scene.addChild(elems.comet);
    scene.addChild(elems.seniai);
    
    director.loop(30);
    $("#loading").css("opacity", 0);
    setTimeout(function() {
    	$("#loading").hide();
    },1000);
}

function showComet(comet, time, settings) {
	var s = settings.comet;
	comet.setLocation( s.startPos.x, s.startPos.y );
	
	// animation definitions
    var aFadeIn = new CAAT.AlphaBehavior().
            setFrameTime(time, s.fadeInSpeed).
            setValues( 0, 1 ).
            setInterpolator(
                new CAAT.Interpolator().createExponentialOutInterpolator(
                    4,
                    false)
            );

	var path = new CAAT.Path().
	            beginPath( s.startPos.x, s.startPos.y ).
	            addCubicTo( 900,20, 400,20, 300,50 ).
	            endPath();
    var aPath = new CAAT.PathBehavior().
            //setAutoRotate(false,true).
            setPath( path ).
            setInterpolator(
                new CAAT.Interpolator().createExponentialInInterpolator(s.moveExp,false) );
                
	var aFadeOut = new CAAT.AlphaBehavior().
            setValues( 1, 0 ).
            setInterpolator(
                new CAAT.Interpolator().createExponentialOutInterpolator(
                    4,
                    false)
            );                 
          
            
    // linking animations between them selves
    aFadeIn.addListener({
        behaviorExpired : function(behavior, time, actor) {
            aPath.setFrameTime(time, s.moveDuration);
        }});
    aPath.addListener({
        behaviorExpired : function(behavior, time, actor) {
            aFadeOut.setFrameTime(time, s.fadeOutSpeed);
        }});        
        
    // linking animations to the comet
	comet.addBehavior( aFadeIn );
	comet.addBehavior( aFadeOut );
	comet.addBehavior( aPath );

        /*.set
            setImage(director.getImage('comet')).
            setImageTransformation(CAAT.ImageActor.prototype.TR_FIXED_TO_SIZE).
            addBehavior(
                new CAAT.PathBehavior().
                    setAutoRotate(true).
                    setPath( new CAAT.Path().setLinear(0,0,0,0) ).
                    setInterpolator(
                        new CAAT.Interpolator().createExponentialInOutInterpolator(2,false) ).
                    setFrameTime( scene.time, 10 ).
                    addListener( {
                        behaviorExpired : function(behaviour,time) {
                            var endCoord= behaviour.path.endCurvePosition();
                            behaviour.setPath(
                                    new CAAT.Path().setCubic(
                                        endCoord.x,
                                        endCoord.y,
                                        Math.random()*director.width,
                                        Math.random()*director.height,
                                        Math.random()*director.width,
                                        Math.random()*director.height,
                                        Math.random()*director.width,
                                        Math.random()*director.height) );
                            behaviour.setFrameTime( scene.time, 3000+Math.random()*3000 )
                        }
                    })
            );*/
           
    /*var tmp = new CAAT.PathActor().
	    setBounds(0,0,director.width,director.height).
	    create().
	    setPath(path).
	    setInteractive(true);
   	scene.addChild(tmp);*/
	
	return comet;        		
}
