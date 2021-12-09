var Episodios= {};
var elems;
var actualFocused;
var temp;
//var Player = document.getElementById('player');
var detailedAnime = parseInt(localStorage.getItem("id_anime"));

var data_Anime;
//called when application was loaded
Episodios.onLoad = function () {
	console.log("Episodios.onLoad()");

	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("episodios.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Episodios.handleKeyDownEvents();
};

var responseUrl = "https://api.aniapi.com/v1/anime/" + detailedAnime;
fetch(responseUrl, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	
	data_Anime = json.data;

	document.getElementById("capa_anime").src = data_Anime.cover_image;
	
	
	});	
	

	var episodios = localStorage.getItem("episodios");


	
	for(var i = 0; i <episodios.length; i++){    
		 
	  	    //criar elemento div   
	  
	  	   	
	  	    var div = document.createElement("div");
	  	    div.classList.add("row", "container-fluid");
	  	    
	  	    div.style="margin-top:4em; padding-left:2em; width: 100%";
	  	    
	  	    
	  	   	div.innerHTML= `
		  	  <div tabindex=${i+1}  class="container episodios focusable" style="padding-top:10px; padding-bottom:10px; margin-top:40px">
		      	<div class="col-sm-5">
		      	<img alt=${episodios[i].video} src="images/Anime1.png" class="img-responsive" id="capa_episodio">
		      	
		      	</div>
		      	
		      	<div  class="col-sm-7 ">
		      	<h3 id="titulo_episodio">'Episode '+ ${i}+1 </h3>
		      	</div>
		      	
		     </div>
		  	    		  
	  	   	`
	  	
	  	  document.getElementById('episodios').appendChild(div);
	  
	  
	  	   	
	  		 //adicionando imagem como filha de de  	 
	
		
}
	  console.log(document.getElementById('episodios'));


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
