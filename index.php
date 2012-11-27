<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="lt" xml:lang="lt">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="author" content="Antanas Sinica" />
	<meta name="copyright" content="UAB Daugiau Dėmesio" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />
	<script type="text/javascript" src="js/modernizr.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
	<?php if(!isset($_GET['nosnow'])): ?> 
	<script type="text/javascript" src="js/snowfall.min.jquery.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#container").snowfall({ shadow: true, round: true, minSize: 7, maxSize:10 });
		});
	</script>
	<?php endif; ?>
	<script type="text/javascript" src="js/caat.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<title>PZU Sveikinimas</title>
</head>
<body>
<div id='loading'></div>
<div id="container">
	<div class='resources'>
		<img src="imgs/comet-ltr.png" id="comet" />
		<img src="imgs/seniai.png" id="seniai" />
		<img src="imgs/tree-toy.png" id="toy" />
		<!--<audio preload='auto' id='music'>
			<source src='sound/music.ogg' type="audio/ogg" />
			<source src='sound/music.mp3' type="audio/mpeg" />
		</audio>
        <audio preload='auto' id='sveikinimas'>
        	<source src='sound/sveikinimas.ogg' type="audio/ogg" />
        	<source src='sound/sveikinimas.mp3' type="audio/mpeg" />
        </audio>-->
	</div>	
	<canvas id="canvas" width="1920" height="1080"></canvas>
</div>
</body>
</html>