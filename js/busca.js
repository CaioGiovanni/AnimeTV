var Main = {};
var elems;
var actualFocused;
var t = tau.animation.target;
//var Player = document.getElementById('player');

//called when application was loaded
Main.onLoad = function () {
	console.log("Main.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Main.handleKeyDownEvents();
};

// called when application has closed
Main.onUnload = function () {
	console.log("Main.onUnload()");
};

// handle all keydown events triggered through remote control.
Main.handleKeyDownEvents = function () {

	// add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	    	
    	switch(e.keyCode){
    	case tvKey.LEFT: //LEFT arrow
        	console.log("LEFT");
        	if (!(actualFocused == 0 || actualFocused == 3)) {
        		moveBackward(actualFocused);
        	}
    		break;
    	case tvKey.UP: //UP arrow
    		console.log("UP");
    		if ((actualFocused == 3 || actualFocused == 4 || actualFocused == 5)) {
				moveNext(actualFocused - 4);
        	}
    		break;
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		if (!(actualFocused == 2 || actualFocused == 5)) {
        		moveNext(actualFocused);
        	}
    		break;
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		if ((actualFocused == 0 || actualFocused == 1 || actualFocused == 2)) {
				moveNext(actualFocused + 2);
        	}
    		break;
    	case tvKey.ENTER: //OK button
    		console.log("OK");
    		t(document.activeElement).tween('fadeInUp', 500);
			window.location.replace("detalhes.html");
    		break;
    	case tvKey.RETURN: //RETURN button
    		console.log("RETURN");
    		window.location.replace("home.html");
    		break;
    	default:
    		console.log("Key code : " + e.keyCode);
    		break;
    	}
    });
};

// binding some events
window.onload = Main.onLoad;
window.onunload = Main.onUnload;

/*********************************************** Player *************************************************/

function moveNext(tidx) {
    for (var i=elems.length; i--;) {
        var tidx2 = elems[i].getAttribute('tabindex');
        if (tidx2 == (tidx + 1)) {
        	elems[i].focus();
        	actualFocused = tidx + 1;
        }
    }
    console.log(actualFocused);
}

function moveBackward(tidx) {
    for (var i=elems.length; i--;) {
        var tidx2 = elems[i].getAttribute('tabindex');
        if (tidx2 == (tidx - 1)) {
        	elems[i].focus();
        	actualFocused = tidx - 1;
        }
    }
    console.log(actualFocused);
}