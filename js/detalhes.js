var Detalhes = {};
var elems;
var actualFocused;
var t = tau.animation.target;
var data;
var list;
//var Player = document.getElementById('player');

//called when application was loaded
Detalhes.onLoad = function () {
	console.log("Detalhes.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	var responseUrl = "https://api.aniapi.com/v1/anime/100";
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
    			createListFile();
    			getListFile();
    			//window.location.replace("lista.html");
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

function createListFile () {
	var successCallback = function(newPath) {
	    console.log('New directory has been created: ' + newPath);
	}
	var errorCallback = function(error) {
	    console.log(error);
	}	
	tizen.filesystem.createDirectory('documents/AnimeTV',successCallback, errorCallback);
	
	try {
		getListFile();
	} catch (e) {}	
	
	const send = data.id;
	console.log(list);
	
	var fileHandleWrite = tizen.filesystem.openFile('documents/AnimeTV/list', 'w');
	console.log('File opened for writing');
	if (list != undefined) {
		send = list + ", " + data.id;
	}
	console.log(send);
	var blobToWrite = new Blob([send]);
	fileHandleWrite.writeBlob(blobToWrite);
	fileHandleWrite.close();
} 

function getListFile () {
	var fileHandleRead = tizen.filesystem.openFile('documents/AnimeTV/list', 'r');
	console.log('File opened for reading');
	var fileContents = fileHandleRead.readBlob();
	console.log('Blob object:');
	console.log(fileContents);
	/* FileReader is a W3C API class, not related to webapi-plugins */
	/* and is capable of extracting blob contents */
	var reader = new FileReader();
	/* Event fires after the blob has been read/loaded */
	reader.addEventListener('loadend', function(contents)
	{
	   const text = contents.srcElement.result;
	   console.log('File contents: ' + text);
	   list = text;
	});
	/* Start reading the blob as text */
	reader.readAsText(fileContents);
	fileHandleRead.close();
}
