var director;
var scene;

// Everything else loads
$(window).load(function() {
	director = new CAAT.Director().initialize(
        1920,
        1080,
        document.getElementById('canvas'));
 
	scene=     director.createScene();
	 
	var circle=    new CAAT.ShapeActor().
	        setLocation(20,20).
	        setSize(60,60).
	        setFillStyle('#ff0000').
	        setStrokeStyle('#000000');
	 
	scene.addChild(circle);
	 
	director.loop(1);
	setTimeout(function() {
		$("#loading").fadeOut(150, function() {
		});
	}, 0);
});

function populateScene() {


    var comet = 
        new CAAT.ImageActor().
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
            );
    scene.addChild(fish);
}




// DOM loads
$(document).ready(function() {
	$(document).snowfall({round : true, minSize: 5, maxSize:8});
});