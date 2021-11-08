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
	
	try {
		var t = tau.animation.target;
	    //,blueBox = document.getElementById('cadastro');
		t('.login-container').tween('fadeInUp', 500);
		//t('#cadastro').tween({rotateZ: 120}, 1000); /* Transform */
		/* CSS property */
		//t('#cadastro').tween({backgroundColor: 'red', border: '10px 10px 10px 3px white'}, 1000);
		//t('#cadastro').tween('swing', 1000).tween('tada', 1000);
	}
	catch (e) {
		// TODO: handle exception
	}
	//t(blueBox);
	
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
        	if (!(actualFocused == 0 || actualFocused == 1 || actualFocused == 2)) {
        		moveBackward(actualFocused);
        	}
    		break;
    	case tvKey.UP: //UP arrow
    		console.log("UP");
    		if (!(actualFocused == 0)) {
    			if (actualFocused == 3) {
    				moveBackward(2);
    			}
    			else {
    				moveBackward(actualFocused);	
    			}
        	}
    		break;
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		if (!(actualFocused == 0 || actualFocused == 1 || actualFocused == 4)) {
        		moveNext(actualFocused);
        	}
    		break;
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		if (!(actualFocused == 2 || actualFocused == 3)) {
        		moveNext(actualFocused);
        	}
    		break;
    	case tvKey.ENTER: //OK button
    		console.log("OK");
			if (actualFocused == 2) {
				window.location.replace("home.html");
				//window.location.href="#two";
			}
			if (actualFocused == 3) {
				window.location.replace("cadastro.html");
			}
    		break;
    	case tvKey.RETURN: //RETURN button
    		console.log("RETURN");
    		window.location.replace("index.html");
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