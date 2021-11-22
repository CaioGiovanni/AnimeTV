var Main = {};
var elems;
var actualFocused;
var t = tau.animation.target;
var newPath = 'documents/AnimeTV';
var loginCredentials;
//var Player = document.getElementById('player');

//called when application was loaded
Main.onLoad = function () {
	console.log("Main.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	try {
		var t = tau.animation.target;
		t('.login-container').tween('fadeInUp', 500);
	}
	catch (e) {
		// TODO: handle exception
	}
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
				createLoginCreds();
				window.location.replace("home.html");
			}
			if (actualFocused == 3) {
				getLoginCreds();
				//window.location.replace("cadastro.html");
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

/*********************************************** Login create path *************************************************/

function createLoginCreds () {
	var successCallback = function(newPath) {
	    console.log('New directory has been created: ' + newPath);
	}
	var errorCallback = function(error) {
	    console.log(error);
	}
	tizen.filesystem.createDirectory('documents/AnimeTV',successCallback, errorCallback);
	
	var fileHandleWrite = tizen.filesystem.openFile('documents/AnimeTV/loginCredentials', 'w');
	console.log('File opened for writing');
	var blobToWrite = new Blob(['Caio, 012345']);
	fileHandleWrite.writeBlob(blobToWrite);
	fileHandleWrite.close();
} 

function getLoginCreds () {
	var fileHandleRead = tizen.filesystem.openFile('documents/AnimeTV/loginCredentials', 'r');
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
	   loginCredentials = text;
	});
	/* Start reading the blob as text */
	reader.readAsText(fileContents);
	fileHandleRead.close();
}

/*var fullPath = 'documents/subDir'
var callback = function(modifiedDirectory) {
    console.log('deleteDirectory() is successfully done. Modified (parent) directory: ' + modifiedDirectory);
}
var errorCallback = function(error) {
    console.log(error);
}
tizen.filesystem.deleteDirectory(fullPath, true, callback, errorCallback);*/
