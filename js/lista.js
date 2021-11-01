var Lista = {};
var elems;
var actualFocused;
//var Player = document.getElementById('player');

//called when application was loaded
Lista.onLoad = function () {
	console.log("Lista.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Lista.handleKeyDownEvents();
};

// called when application has closed
Lista.onUnload = function () {
	console.log("Lista.onUnload()");
};

// handle all keydown events triggered through remote control.
Lista.handleKeyDownEvents = function () {

	// add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	    	
    	switch(e.keyCode){
    	case tvKey.LEFT: //LEFT arrow
        	console.log("LEFT");
        	if (actualFocused>0){
        		moveBackward(actualFocused);
        	}
    		break;
    		

    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		if (actualFocused<5) {
        		moveNext(actualFocused);
        	}
        	
    
    		break;
    	
    	case tvKey.ENTER: //OK button
    		console.log("OK");
			if (!(actualFocused == 0 || actualFocused==4)) {
				window.location.replace("detalhes.html");
			}
		
    		break;
    		
    	case tvKey.RETURN: //Return button
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
window.onload = Lista.onLoad;
window.onunload = Lista.onUnload;

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