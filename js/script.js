var director;
var scene;
var elems = {};
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


function __init() {
	director = new CAAT.Director().initialize(
        1920,
        1080,
        document.getElementById('canvas'));
        
    new CAAT.ImagePreloader().loadImages(
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
	            director.setImagesCache(images);
	            __scene();
			}
        }
    );	
}

function __scene() {
	scene = director.createScene();

	var bottomLayerSprites = {
		main: new CAAT.SpriteImage().initialize(director.getImage('main'), 1, 1),
		logo: new CAAT.SpriteImage().initialize(director.getImage('logo'), 1, 1),
		border: new CAAT.SpriteImage().initialize(director.getImage('border'), 1, 1),
	};
	var topLayerSprites = {
		seniai: new CAAT.SpriteImage().initialize(director.getImage('seniai'), 1, 1)
	};
	
	var cometImage = new CAAT.SpriteImage().initialize(director.getImage('comet'), 1, 1);
    elems.comet = new CAAT.Actor()
    	.setBackgroundImage(cometImage, true)
    	.setAlpha(0);
	showComet(settings.comet.when);		
    	
	var addSpriteToScene = function(key,val) {
		scene.addChild(new CAAT.Actor().setBackgroundImage(val, true));
	};            
	
    $.each(bottomLayerSprites, addSpriteToScene); 
    scene.addChild(elems.comet);
    $.each(topLayerSprites, addSpriteToScene);
    
    director.loop(30);
    
    $("#loading").css("opacity", 0);
    setTimeout(function() {
    	$("#loading").hide();
    },1000);
}

function showComet(time) {
	var s = settings.comet;
	var comet = elems.comet;
	comet.setLocation( s.startPos.x, s.startPos.y );
    	/*.addBehavior(
                    new CAAT.ScaleBehavior().
                        setFrameTime(scene.time, cometScale).
                        setValues( 1,5, 1,5 ).
                        setInterpolator(
                            new CAAT.Interpolator().createExponentialInInterpolator(
                                3,
                                false)
                        ))*/
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
          
            
    aFadeIn.addListener({
        behaviorExpired : function(behavior, time, actor) {
            aPath.setFrameTime(time, s.moveDuration);
        }});
    aPath.addListener({
        behaviorExpired : function(behavior, time, actor) {
            aFadeOut.setFrameTime(time, s.fadeOutSpeed);
        }});        
        
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
           
    var tmp = new CAAT.PathActor().
	    setBounds(0,0,director.width,director.height).
	    create().
	    setPath(path).
	    setInteractive(true);
	       		
   	scene.addChild(tmp);

	
}

// DOM loads
$(document).ready(function() {
	$("#container").snowfall({
		shadow: true, round: true, minSize: 7, maxSize:10 });
	__init();
});

// Everything else loads
$(window).load(function() {});