// DOM loads
$(document).ready(function() {
	$(window).resize();
});

// Everything else loads
$(window).load(function() {
	var settings = {
		sound: {
			musicAt:500,
			musicVolume:0.80,
			greetingAt:1500,
			greetingVolume:0.60
		},
		comet: {
			when: 2500,
			fadeInSpeed: 800,
			moveDuration:2500,
			moveExp: 4,
			fadeOutSpeed:1200,
			
			// comet path ltr
			startPos: { x:300, y:70 },
			path: { x0:400,y0:20, x1:900,y1:20, x2:1224,y2:130}
			// comet path rtl 
			/*startPos: { x:1324, y:170 },
			path: { x0:900,y0:20, x1:400,y1:20, x2:300,y2:50 }*/
		},
		toys: {
			blinkDelay:100,// kiek uzdelsti po uzkrovimo pries pradedant spiginti 
			blinkSpeed:280, // kiek laiko uzsilaiko uzdegta lempute
			blinkRandom:100, // blinkSpeed varijuoja 0-blinkRandom kiekvienai eglutei
			blinkGap:0,	// po kiek laiko uzgesus lemputei uzsidega kita
			blinkFade:0,	// kiek laiko trunka fadeIn/fadeOut'ai
			// bendras laikas vineai lemputei:
			// blinkSpeed + blinkRandom + blinkGap + blinkFade * 2
			// 200 + 50 + 30 + 40*2 = 360
			trees: [
				[ // didziausia eglute
					{ x: 421, y: 921, size:25 }, // pirmas kairej apacioj
					{ x: 524, y: 915, size:26 }, // toliau is eiles
					{ x: 624, y: 883, size:36 }, // didziausias
					{ x: 365, y: 852, size:21 }, // 
					{ x: 450, y: 858, size:19 }, //
					{ x: 557, y: 846, size:26 }, //
					{ x: 639, y: 803, size:15 },
					{ x: 476, y: 781, size:20 }, //
					{ x: 590, y: 776, size:20 }, //
					{ x: 533, y: 726, size:20 },
					{ x: 604, y: 679, size:28 },
					{ x: 542, y: 661, size:18 },
					{ x: 583, y: 614, size:17 }
				],
				[ // eglutė po kaire
					{ x: 362, y: 627, size:13 },
					{ x: 416, y: 637, size:14 },
					{ x: 455, y: 630, size:12 },
					{ x: 396, y: 615, size:15 },
					{ x: 428, y: 610, size:15 },
					{ x: 449, y: 606, size:7 },
					{ x: 369, y: 588, size:11 },
					{ x: 411, y: 582, size:14 },
					{ x: 389, y: 557, size:9 },
					{ x: 419, y: 551, size:14 },
					{ x: 400, y: 532, size:9 },
					{ x: 400, y: 506, size:8 }
				],
				[ // eglutė po desine
					{ x: 1597, y: 676, size:10 },
					{ x: 1624, y: 659, size:15 },
					{ x: 1649, y: 641, size:19 },
					{ x: 1588, y: 650, size:11 },
					{ x: 1616, y: 631, size:14 },
					{ x: 1627, y: 605, size:13 },
					{ x: 1590, y: 608, size:13 },
					{ x: 1599, y: 582, size:11 },
					{ x: 1575, y: 570, size:7 },
					{ x: 1588, y: 563, size:8 },
					{ x: 0, y: 0, size:10 }
				]
				
			]
				
		}
	};
	
	__init(settings);
}).resize(function() {
	var win = $(window);
	var winWidth = win.width();
	var winHeight = win.height();
	var canvas = document.getElementById('canvas');
	var container = document.getElementById('container');
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
	 
	container.style.width = newW + "px";
	container.style.height = newH + "px";
	container.style.top = ((winHeight - newH) / 2) + "px";
	console.log("resize", newW, newH, winWidth, winHeight);
});

function __init(settings) {
	//CAAT.DEBUG=1;
	var director = new CAAT.Director()
		.initialize(
	        1920,
	        1080,
	        document.getElementById('canvas'))
	    .addAudio('music', document.getElementById('music'))
	    .addAudio('sveikinimas', document.getElementById('sveikinimas'))
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
		document.getElementById('seniai'),
		document.getElementById('toy')
	];
	// Make images into sprites for CAAT
	var sprites = {
		comet: new CAAT.SpriteImage().initialize(document.getElementById('comet'), 1, 1),
		seniai: new CAAT.SpriteImage().initialize(document.getElementById('seniai'), 1, 1),
		toy: new CAAT.SpriteImage().initialize(document.getElementById('toy'), 1, 1),
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
	
	showToys(scene, sprites.toy, settings);
	
    //$.each(bottomLayerSprites, addSpriteToScene);
    //$.each(topLayerSprites, addSpriteToScene);
    	
    scene.addChild(elems.comet);
    scene.addChild(elems.seniai);
    
 	
    scene.createTimer(
                0,
                settings.sound.musicAt,
                function(scene_time, timer_time, timertask_instance)  {   // timeout
    				director.setVolume('music', settings.sound.musicVolume);
    				director.audioLoop('music');
                },
                function(scene_time, timer_time, timertask_instance)  {   // tick
                },
                function(scene_time, timer_time, timertask_instance)  {   // cancel
                }
	);
	scene.createTimer(
                0,
                settings.sound.greetingAt,
                function(scene_time, timer_time, timertask_instance)  {   // timeout
                    director.setVolume('sveikinimas', settings.sound.greetingVolume);
                    director.audioPlay('sveikinimas');
                },
                function(scene_time, timer_time, timertask_instance)  {   // tick
                },
                function(scene_time, timer_time, timertask_instance)  {   // cancel
                }
	)            
    
    director.loop(30);
    $("#loading").css("opacity", 0);
    setTimeout(function() {
    	$("#loading").hide();
    },1000);
}

function showToys(scene, sprite, settings) {
	// first toy and others chained to blink
	var toySettings = settings.toys,
		trees = toySettings.trees;
		
	var positionToy = function(actor, info) {
		var x = info.x - 30,
			y  = info.y,
			size = info.size / 36; 
		actor
			.centerOn(x, y)
			.setScale(size, size);
	}
		
	for(var i = 0; i < trees.length; i++) {
	//var i = 0;
		(function(toys, toySettings) {
			var j = 0;
			var actor = new CAAT.Actor()
		    	.setBackgroundImage(sprite, true)
		    	.setAlpha(0);
		    positionToy(actor, toys[j]);
		    //toySettings.blinkGap
		    //toySettings.blinkFade
	        var speed = parseInt(toySettings.blinkSpeed + Math.random()*toySettings.blinkRandom);
			var fadeIn = new CAAT.AlphaBehavior().
					setFrameTime(toySettings.blinkDelay, toySettings.blinkFade).
		            setValues( 0, 1 )/*.
		            setInterpolator(
		                new CAAT.Interpolator().createExponentialInInterpolator(
		                    4,
		                    false)
		            )*/;
		   	var fadeOut = new CAAT.AlphaBehavior().
		            setValues( 1, 0 )/*.
		            setInterpolator(
		                new CAAT.Interpolator().createExponentialInInterpolator(
		                    4,
		                    false)
		            )*/;                 
	          
	            
		    // pasibaigus fadeIn, palaukti ir paleisti fadeOut
		    fadeIn.addListener({
		        behaviorExpired : function(behavior, time, actor) {
		            fadeOut.setFrameTime(time+speed, toySettings.blinkFade);
		        }});
		    // pasibaigus fadeOut palaukti ir paleisti fadeIn tik jau
		    // sekanciam zaislui	    
		    fadeOut.addListener({
		        behaviorExpired : function(behavior, time, actor) {
		        	j = ( j+1 == toys.length ? 0 : j+1 ); 
		        	positionToy(actor, toys[j]);
		            fadeIn.setFrameTime(time+toySettings.blinkGap, toySettings.blinkFade);
		        }});
		        	
	    	actor.addBehavior( fadeIn );
	    	actor.addBehavior( fadeOut );
		   	scene.addChild(actor);
		}) ( trees[i], toySettings );
	}
	
	// all toys on all trees
	/*var trees = settings.toys.trees, toys, toy, actor, size, x, y;
	for(var i = 0; i < trees.length; i++) {
		toys = trees[i];
		for(var j = 0; j < toys.length; j++) {
			actor = new CAAT.Actor()
				//.setBounds(toy.x, toy.y, size, size)
				//.setSize(parseInt(toy.size*2.25), parseInt(toy.size*2.25))
		    	.setBackgroundImage(sprite, true)
		    	.setAlpha(1);
		    positionToy(actor, toys[j]);
		   	scene.addChild(actor);
			//console.log("tree "+i, toy);
		}  
	}*/
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
	            addCubicTo( s.path.x0,s.path.y0, s.path.x1,s.path.y1, s.path.x2,s.path.y2 ).
	            endPath();
    var aPath = new CAAT.PathBehavior().
            //setAutoRotate(false,true).
            setPath( path ).
            setInterpolator(
                new CAAT.Interpolator().createExponentialInInterpolator(s.moveExp,false) );
                
	var aFadeOut = new CAAT.AlphaBehavior().
            setValues( 1, 0 ).
            setInterpolator(
                new CAAT.Interpolator().createExponentialInInterpolator(
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
