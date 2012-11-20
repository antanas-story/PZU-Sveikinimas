var loading = { fadeOutSpeed: 500, fadeOutDelay: 30 };
var comet = {  }
var c;
var ctx;
var width = 1920;
var height = 1080;
var frameInterval = 30;
var time = 0;
var img = {};
var animationStack = new Array();
var animations = new Array();
var animationInterval;


function start() {
	console.log("animation started");
	animateEvery(3500, animationComet);
	//animateEvery(1000, animationCometTrajectory);
	//animateOnce(500, animationComet);
	//animateOnce(2800, animationComet);
	
	animationInterval = setInterval(function() {
		draw();
		time += frameInterval;
	}, frameInterval);
}
function animateEvery(interval, animationFunction) {
	animationStack.push({
		interval:interval,
		callback:animationFunction
	});
}
function animateOnce(when, animationFunction) {
	animationStack.push({
		once:when,
		callback:animationFunction
	});
}
function animateAfter(interval, animationFunction) {
	animationStack.push({
		once:time+interval,
		callback:animationFunction
	});
}
function stopAnimation(animationIndex) {
	animations.splice(animationIndex, 1);
}
function checkAnimationStack() {
	// starting animations
	for(var i = 0; i < animationStack.length; i++) {
		var a = animationStack[i];
		// if interval is correct, start animation
		if(a.interval && time % a.interval < frameInterval) {
			animations.push(a) 
		}
		// if its time for an animation, start it
		if(a.once && time - a.once > frameInterval) {
			animationStack.splice(i, 1);
			animations.push(a) 
		}
	}	
}

function draw() {
	// clear everything
	ctx.clearRect(0,0,width,height);
	// static stuff
	ctx.drawImage(img.main,0,0);
	ctx.drawImage(img.logo,0,0);
	ctx.drawImage(img.border,0,0);
		
	checkAnimationStack();
	
	if(animations.length > 0)
		for(var i = 0; i < animations.length; i++) {
			var a = animations[i];
			var t = a.interval ? time % a.interval : (a.once ? time-a.once : time);
			a.callback(t, i);
		}
	
	ctx.drawImage(img.seniai,0,0);
	testCurve();
	//clearInterval(animationInterval);
	//if(time > 2000) { clearInterval(animation); }
	//ctx.drawImage(img.treeToy,0,0);		
}

function testCurve() {
	totalTime = 1000;
	for(var time = 0; time < totalTime; time+=30) {
		var startX = 1340;
		var startY = 130;
		var travelDistanceX = -800;
		var travelDistanceY = 85;
		var coords = parabola(time / totalTime, travelDistanceX, travelDistanceY);
		
		//console.log("FINAL", coords.x, coords.y);
		//console.log("TMP", tmpx, tmpy);
		ctx.beginPath();
		ctx.arc(startX+coords.x, startY+coords.y, 4, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fillStyle = "rgb(255,255,0)";
		ctx.fill();
	}
}

function parabola(percentage, distanceX, distanceY) {
	var tmpx = 2 * percentage - 1;
	var tmpy = tmpx*tmpx;
	var x = (tmpx + 1) * (distanceX/2);
	var y = tmpy * (distanceY);
	return { x: x, y: y };
}

function animationComet(time, animationIndex) {
	stopAnimation(animationIndex);
	
	animateAfter(0, function(time, index) {
		var totalTime = 1500;
		if(time > totalTime) { stopAnimation(index); return; }
		var startX = 1340;
		var startY = 130;
		var travelDistanceX = -800;
		var travelDistanceY = 85;
		var coords = parabola(time / totalTime, travelDistanceX, travelDistanceY);
		ctx.drawImage(img.comet,startX+coords.x,startY+coords.y);
	});
}

// Everything else loads
$(window).load(function() {
	img.border=document.getElementById("border");
	img.comet=document.getElementById("comet");
	img.logo=document.getElementById("logo");
	img.main=document.getElementById("main");
	img.seniai=document.getElementById("seniai");
	img.treeToy=document.getElementById("tree-toy");
	draw();
	
	setTimeout(function() {
		$("#loading").fadeOut(loading.fadeOutSpeed, function() {
			start();
		});
	}, loading.fadeOutDelay);
});

// DOM loads
$(document).ready(function() {
	$(document).snowfall({round : true, minSize: 5, maxSize:8});
	c = document.getElementById("canvas")
	ctx = c.getContext("2d");
});