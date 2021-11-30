var Episodios= {};
var elems;
var actualFocused;
//var Player = document.getElementById('player');

//called when application was loaded
Episodios.onLoad = function () {
	console.log("Episodios.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Episodios.handleKeyDownEvents();
};

var responseUrl = "https://api.aniapi.com/v1/episode?anime_id=" + localStorage.id_anime;;
fetch(responseUrl, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	console.log(json.data); 
	data = json.data;
	document.getElementById("capa_anime").src = data.cover_image;
	document.getElementById("titulo-anime").innerHTML = data.titles.en;
	document.getElementById("descricao").innerHTML = data.descriptions.en
	document.getElementById("categoria").innerHTML = data.genres;
	});	

// called when application has closed
Episodios.onUnload = function () {
	console.log("Episodios.onUnload()");
};

// handle all keydown events triggered through remote control.
Episodios.handleKeyDownEvents = function () {

	// add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	    	
    	switch(e.keyCode){
    	case tvKey.LEFT: //LEFT arrow
        	
    		console.log("LEFT");
    		if (actualFocused > 0) {
    			actualFocused=0;
    			elems[0].focus();
    			break;
    			
        	}
    		break;
    	
    	case tvKey.UP: //UP arrow
    		console.log("UP");
    		if ((actualFocused>=2)) {
    			moveBackward(actualFocused);
        	}
    		break;
    		
    	case tvKey.RIGHT: //RIGHT arrow
    	
    		console.log("RIGHT");
    		if (actualFocused == 0 ) {
        		moveNext(actualFocused);
        	}
    		break;
    		
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
        	if (!(actualFocused == 0)){
        		moveNext(actualFocused);
        	}
        	break;
        	
    	case tvKey.ENTER: //OK button
    		console.log("OK");
    		if (actualFocused == 0) {
    			window.location.replace("lista.html");
    			break;
			}
    		else{
    			window.location.replace("play.html");
    			
			}
			
    		break;
    		
    	case tvKey.RETURN: //RETURN button
    		console.log("RETURN");
    		window.location.replace("detalhes.html");
    		break;
    	default:
    		console.log("Key code : " + e.keyCode);
    		break;
    	}
    });
};

// binding some events
window.onload = Episodios.onLoad;
window.onunload = Episodios.onUnload;

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
