var Main = {};
var elems;
var actualFocused;
var t = tau.animation.target;
var temp;
var search = localStorage.getItem("search");
var tempList;
//var Player = document.getElementById('player');

//called when application was loaded
Main.onLoad = function () {
	console.log("Main.onLoad()");

	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("busca.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	document.getElementById("resultText").textContent = "Resultados da pesquisa: " + search;
	
	var responseUrl = "https://api.aniapi.com/v1/anime?title=" + search;
	fetch(responseUrl, {
		  method: "GET",
		  headers: {"Content-type": "application/json;charset=UTF-8"}
		})
		.then(response => response.json()) 
		.then(json => {console.log(json);
		tempList = json.data.documents;
		});	
	
	setTimeout(()=>{
		var divRow;
		var div;
		for(var i = 0; i < tempList.length; i++){
			var divFather = document.getElementById("listContainer");
			console.log(tempList[i].id);
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
	  	   		<img alt="${tempList[i].id}" style="padding:.5em;" src="${tempList[i].cover_image}" tabindex="${i}" class="img-responsive container focusable" id="${tempList[i].id}">
			</div>
	  
	  	   	`;
	  	  }
		elems = document.getElementsByClassName('focusable');
		moveNext(-1);
	},2000);
	
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
    	case tvKey.UP: //LEFT arrow
        	console.log("UP");
        	if (actualFocused > 2){
        		moveNext(actualFocused - 4);
        	}
    		break;
    	case tvKey.DOWN: //LEFT arrow
        	console.log("DOWN");
        	if (actualFocused < tempList.length - (tempList.length % 3)){
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
    		if (actualFocused < tempList.length) {
        		moveNext(actualFocused);
        	}    
    		break;
    	
    	case tvKey.ENTER: //OK button
    		console.log("OK");
    		var tempActualFocused;
    		for (var i = elems.length; i--;) {
    	        var tidx2 = elems[i].getAttribute('tabindex');
    	        if (tidx2 == actualFocused) {
    	        	localStorage.setItem("id_anime", elems[i].alt);
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