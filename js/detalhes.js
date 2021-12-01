var Detalhes = {};
var elems;
var actualFocused;
var t = tau.animation.target;
var data;
var list;
var history;
//var detailedAnime = 5;
var temp;
var detailedAnime = parseInt(localStorage.getItem("id_anime"));

//var Player = document.getElementById('player');

//called when application was loaded
Detalhes.onLoad = function () {
	console.log("Detalhes.onLoad()");

	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("detalhes.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	getLoginCreds(getList);
	getLoginCreds(getHistory);
	
	setTimeout(()=>{
		if (list.includes(detailedAnime)) {
			document.getElementById("btn_add_lista").textContent = "Remover da lista";
			document.getElementById("btn_add_lista").style.background="#E9967A";
		}
		if (history[detailedAnime] != undefined) {
			document.getElementById("btn_episodio_atual").textContent = "Assistir Episodio atual : " + history[detailedAnime];
		}
	},1300);
	
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	
	var responseUrl = "https://api.aniapi.com/v1/anime/" + detailedAnime;
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
    			getLoginCreds(addToList);
    			//window.location.replace("lista.html");
			}
    		else if (actualFocused == 1) {
				window.location.replace("episodios.html");
			}
    		else if (actualFocused == 2) {
    			getLoginCreds(addToHistory);
    			setTimeout(()=>{
    				window.location.replace("play.html");
    			},3000);
			}
    		break;
    	case tvKey.RETURN: //RETURN button
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
			console.log(list.includes(detailedAnime));
		});	 
}

function getHistory(x) {
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
			history = json.history;
		});	 
}

function addToList(x) {
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
			console.log(json.list);
			list = json.list;
			console.log(list.includes(detailedAnime));
			if (list.includes(detailedAnime)) {
				removeList(json._id);
			}
			else {
				updateList(json._id);
			}
		});	 
}

function updateList(x) {
	list.push(detailedAnime);
	let sendJson = {
		"list": list
	}
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "PATCH",
		  body: JSON.stringify(sendJson),
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
		});
	document.getElementById("btn_add_lista").textContent = "Remover da lista";
	document.getElementById("btn_add_lista").style.background="#E9967A";
}

function removeList(x) {
    list = list.filter(function(value, index, arr){ 
        return value != detailedAnime;
    });
	let sendJson = {
		"list": list
	}
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "PATCH",
		  body: JSON.stringify(sendJson),
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
		});	
	document.getElementById("btn_add_lista").textContent = "Adicionar à lista";
	document.getElementById("btn_add_lista").style.background="yellow";
}

function addToHistory(x) {
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
			history = json.history;
			if (history[detailedAnime] == undefined) {
				history[detailedAnime] = 1;
				console.log(json._id);
				updateHistory(json._id);
			}
			localStorage.setItem("actualEpisode", history[detailedAnime]);
		});	 
}

function updateHistory(x) {
	let sendJson = {
		"history": history
	}
	var responseUrl = "http://10.0.2.2:8080/users/" + x;
	fetch(responseUrl, {
		  method: "PATCH",
		  body: JSON.stringify(sendJson),
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		}).then(response => response.json()).then(json => {
			console.log(json);
		});	 
}