var Detalhes = {};
var elems;
var actualFocused;
var t = tau.animation.target;
//var Player = document.getElementById('player');

//called when application was loaded
Detalhes.onLoad = function () {
	console.log("Detalhes.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	var responseUrl = "https://api.aniapi.com/v1/anime/200";
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		})
		.then(response => response.json()) 
		.then(json => {console.log(json);
		console.log(json.data);
		console.log(json.data.titles); 
		document.getElementById("titulo-anime").innerHTML = json.data.titles.en;
		document.getElementById("descricao").innerHTML = json.data.descriptions.en
		document.getElementById("categoria").innerHTML = json.data.genres;
		});	
	
	// setup handler to key events
	Detalhes.handleKeyDownEvents();
};

// called when application has closed
Detalhes.onUnload = function () {
	console.log("Main.onUnload()");
};

// handle all keydown events triggered through remote control.
Detalhes.handleKeyDownEvents = function () {

	// add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	    	
    	switch(e.keyCode){
    	case tvKey.LEFT: //LEFT arrow
        	
    		console.log("LEFT");
    		if (!(actualFocused == 0)) {
    			if (actualFocused == 3) {
    				moveBackward(2);
    			}
    			else {
    				moveBackward(actualFocused);	
    			}
        	}
    		break;
    	
    	case tvKey.UP: //UP arrow
    		console.log("UP");
    		if (!(actualFocused == 0 || actualFocused == 1 || actualFocused == 3)) {
        		moveNext(actualFocused);
        	}
    		break;
    		
    	case tvKey.RIGHT: //RIGHT arrow
    	
    		console.log("RIGHT");
    		if (!(actualFocused == 2 || actualFocused == 3)) {
        		moveNext(actualFocused);
        	}
    		break;
    		
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
        	if (!(actualFocused == 0 || actualFocused == 1 || actualFocused == 2)) {
        		moveBackward(actualFocused);
        	}
        	break;
    	case tvKey.ENTER: //OK button
    		console.log("OK");
    		if (actualFocused == 0) {
    			window.location.replace("lista.html");
			}
    		else if (actualFocused == 1) {
				window.location.replace("episodios.html");
			}
    		else if (actualFocused == 2) {
				window.location.replace("play.html");
			}
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
window.onload = Detalhes.onLoad;
window.onunload = Detalhes.onUnload;

/*********************************************** Player *************************************************/

function moveNext(tidx) {
    for (var i=elems.length; i--;) {
        var tidx2 = elems[i].getAttribute('tabindex');
        if (tidx2 == (tidx + 1)) {
        	elems[i].focus();
        	actualFocused = tidx + 1;
        }
    }
}

function moveBackward(tidx) {
    for (var i=elems.length; i--;) {
        var tidx2 = elems[i].getAttribute('tabindex');
        if (tidx2 == (tidx - 1)) {
        	elems[i].focus();
        	actualFocused = tidx - 1;
        }
    }
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
