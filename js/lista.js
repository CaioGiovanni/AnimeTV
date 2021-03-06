var Lista = {};
var elems;
var actualFocused;
var temp;
var list;
var capaList = [];
//var Player = document.getElementById('player');

//called when application was loaded
Lista.onLoad = function () {
	console.log("Lista.onLoad()");

	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("lista.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	getLoginCreds(getList);
	
	setTimeout(()=>{
		var divRow;
		var div;
		for(var i = 0; i < capaList.length; i++){
			var divFather = document.getElementById("listContainer");
			if (i % 3 == 0) {
				div = document.createElement("div");
				div.classList.add("col-lg-10");
				div.style.marginLeft = "4em";
				divFather.appendChild(div);
				divRow = document.createElement("div");
				divRow.classList.add("row");
				div.appendChild(divRow);
			}
	  	   	divRow.innerHTML += `
	  	   	<div class="col-lg-4">
	  	   		<img alt="${list[i]}" style="padding:.5em;" src="${capaList[i]}" tabindex="${i}" class="img-responsive container focusable" id="${list[i]}">
			</div>
	  
	  	   	`;
	  	  }
		elems = document.getElementsByClassName('focusable');
		moveNext(-1);
		console.log(list);
		console.log(capaList);
	},5000);
	
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
    	case tvKey.UP: //LEFT arrow
        	console.log("UP");
        	if (actualFocused > 2){
        		moveNext(actualFocused - 4);
        	}
    		break;
    	case tvKey.DOWN: //LEFT arrow
        	console.log("DOWN");
        	if (actualFocused < list.length - (list.length % 3)){
        		moveNext(actualFocused + 2);
        	}
    		break;
    	case tvKey.LEFT: //LEFT arrow
        	console.log("LEFT");
        	if (actualFocused > 0){
        		moveBackward(actualFocused);
        	}
    		break;
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		if (actualFocused < list.length) {
        		moveNext(actualFocused);
        	}    
    		break;
    	
    	case tvKey.ENTER: //OK button
    		console.log("OK");
    		var tempActualFocused;
    		for (var i = elems.length; i--;) {
    	        var tidx2 = elems[i].getAttribute('tabindex');
    	        if (tidx2 == actualFocused) {
    	        	localStorage.setItem("id_anime", list[tidx2]);
    	    		window.location.replace("detalhes.html");
    	        }
    	    }
    		break;
    		
    	case tvKey.RETURN: //Return button
    		console.log("RETURN");
    		temp.pop();
    		const temp2 = temp.pop();
    		localStorage.setItem("lastPages", JSON.stringify(temp));
    		window.location.replace(temp2);
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


function getLoginCreds (callback) {
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
	   const x = loginCredentials.split(',')[0];
	   callback(x);
	});
	/* Start reading the blob as text */
	reader.readAsText(fileContents);
	fileHandleRead.close();
}

function getList(x) {
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
			console.log(json.list);
			list = json.list;
			getCapas(0);
		});
}

function getCapas(i) {
	var responseUrl = "https://api.aniapi.com/v1/anime/" + list[i];
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
			capaList.push(json.data.cover_image);
			if (i < list.length - 1) {
				i++;
				getCapas(i);
				console.log(i);
			}
		});
}