var Home = {};
var elems;
var actualFocused;
//var Player = document.getElementById('player');

//called when application was loaded
Home.onLoad = function () {
	console.log("Home.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Home.handleKeyDownEvents();
};

// called when application has closed
Home.onUnload = function () {
	console.log("Home.onUnload()");
};

// handle all keydown events triggered through remote control.
Home.handleKeyDownEvents = function () {

	// add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	    	
    	switch(e.keyCode){
    	case tvKey.LEFT: //LEFT arrow
        	console.log("LEFT");
        	
        	if (!(actualFocused==2 || actualFocused==6)) {
        		moveBackward(actualFocused);
        	}
        	
        	
    		break;
    		
    	case tvKey.UP: //UP arrow
    		console.log("UP");
    		if (actualFocused >5) {
    			elems[2].focus();
	        	actualFocused = 2;
        	}
    		else if (1<actualFocused <5) {
    			elems[0].focus();
	        	actualFocused = 0;
        	}
    		break;
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		
    		if (actualFocused < 5 && actualFocused!=1) {
        		
        		moveNext(actualFocused);
        	}
    		else if (actualFocused >= 6 && actualFocused!=10) {
        		
        		moveNext(actualFocused);
        	}
    		
    		
    		break;
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		
    		if (actualFocused<=1) {
				moveNext(actualFocused);
				elems[2].focus();
	        	actualFocused = 2;

	    		
        	}
    		else if(2<actualFocused<=5){
    			elems[6].focus();
	        	actualFocused = 6;
    			
    		}
    		break;
    	case tvKey.ENTER: //OK button
    		console.log("OK");
			if (actualFocused == 0) {
				window.location.replace("lista.html");
			}
			else if (actualFocused == 1) {
				//pesquisa
				
			}
			else if(actualFocused >=2){
				window.location.replace("detalhes.html");
			}
			
    		break;
    	
    	default:
    		console.log("Key code : " + e.keyCode);
    		break;
    	}
    });
};

// binding some events
window.onload = Home.onLoad;
window.onunload = Home.onUnload;

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