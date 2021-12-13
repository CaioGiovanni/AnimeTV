var Episodios= {};
var elems;
var actualFocused;
var temp;
//var Player = document.getElementById('player');
var detailedAnime = parseInt(localStorage.getItem("id_anime"));
var animeCapa;
var actualEpisode;

var data_Anime;
//called when application was loaded
Episodios.onLoad = function () {
	console.log("Episodios.onLoad()");

	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("episodios.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	getLoginCreds(getList);
	
	setTimeout(()=>{
		if (list.includes(detailedAnime)) {
			document.getElementById("btn_add_lista").textContent = "Remover da lista";
			document.getElementById("btn_add_lista").style.background="#E9967A";
		}
		if (history[detailedAnime] != undefined) {
			document.getElementById("btn_episodio_atual").textContent = "Assistir Episodio atual : " + history[detailedAnime];
		}
	},1300);
	
	
	var responseUrl = "https://api.aniapi.com/v1/anime/" + detailedAnime;
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		})
		.then(response => response.json()) 
		.then(json => {console.log(json);
		
		data_Anime = json.data;
		animeCapa = data_Anime.cover_image;
		console.log(animeCapa);
		document.getElementById("capa_anime").src = animeCapa;
	
		var episodios = JSON.parse(localStorage.getItem("episodios"));
		var count = 0;
		for(var i = 0; i < episodios.length; i++){
				if (episodios[0].source == episodios[i].source) {
					count++;
			  	    var div = document.createElement("div");
			  	    div.classList.add("row", "container-fluid");
			  	    
			  	    div.style="margin-top:4em; padding-left:2em; width: 100%";
			  	    
			  	    
			  	   	div.innerHTML= `
				  	  <div tabindex=${count}  class="container episodios focusable" style="padding-top:10px; padding-bottom:10px; margin-top:40px">
				      	<div class="col-sm-5">
				      	<img alt=${episodios[i].video} src=${animeCapa} class="img-responsive" id=${episodios[i].number}>
				      	
				      	</div>
				      	
				      	<div  class="col-sm-7 ">
				      	<h3 id="titulo_episodio">Episódio ${count}</h3>
				      	</div>
				      	
				     </div>
				  	    		  
			  	   	`
			  	
			  	  document.getElementById('episodios').appendChild(div);
				}
				else {
					console.log("continue");
				}

	}
	});
	
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Episodios.handleKeyDownEvents();
};

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
    			moveNext(-1);
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
    		if (actualFocused == 0) {
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
    			getLoginCreds(addToList);
			}
    		else{
    			for (var i=elems.length; i--;) {
    		        var tidx2 = elems[i].getAttribute('tabindex');
    		        if (tidx2 == actualFocused) {
    		        	actualEpisode = elems[i].firstElementChild.firstElementChild.id;
    		        }
    		    }
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
			history[detailedAnime] = actualEpisode;
			console.log(json._id);
			updateHistory(json._id);
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