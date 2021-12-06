var Avaliados = {};
var elems;
var actualFocused;
var teste;
var temp;


//var Player = document.getElementById('player');

//called when application was loaded
Avaliados.onLoad = function () {
	console.log("Avaliados.onLoad()");
	
	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("avaliados.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	elems = document.getElementsByClassName("focusable");
	moveNext(-1);
	
	console.log(elems)
	// setup handler to key events
	Avaliados.handleKeyDownEvents();
};

// called when application has closed
Avaliados.onUnload = function () {
	console.log("Avaliados.onUnload()");
};
	
	
//avaliados
var responseUrl = "http://api.aniapi.com/v1/anime/";
fetch(responseUrl, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	
	
	teste = json.data.documents;
	
	
		
	 for(var i = 0; i < teste.length; i=i+4){    
		 
  	    //criar elemento div   
  	   	if(teste[i].cover_image!=" "){
  	   	
  	    var div = document.createElement("div");
  	    div.classList.add("row")
  	    div.classList.add("container-fluid");
  	    div.style="margin-top:4em; padding-left:2em; width: 100%";
  	    
  	    
  	   	div.innerHTML= `
  	   	
  	   <div class="col-lg-3">
  	   	 <img alt="${teste[i].id}" style="padding:.5em;" src=${teste[i].cover_image} tabindex=${i+2} 
  		  class="img-responsive container focusable imagem" id="capa_anime">
  		</div>
  		
   	   <div class="col-lg-3">
   	   	<img alt="${teste[i+1].id}" style="padding:.5em;" src=${teste[i+1].cover_image} tabindex=${i+3} 
  		  class="img-responsive container focusable imagem" id="capa_anime">
  		</div>
  		
   	   <div class="col-lg-3">
   	   	<img alt="${teste[i+2].id}" style="padding:.5em;" src=${teste[i+2].cover_image} tabindex=${i+4} 
  		  class="img-responsive container focusable imagem" id="capa_anime">
  		</div>
  		
   	   <div class="col-lg-3">
   	   	<img alt="${teste[i+3].id}" style="padding:.5em;" src=${teste[i+3].cover_image} tabindex=${i+5} 
  		  class="img-responsive container focusable imagem" id="capa_anime">
  		</div>
  		
  		  
  	   	`
  	   	
  	   	
  		document.getElementById("lista_avaliados").appendChild(div); //adicionando imagem como filha de demo
    	  
  	   	}
  	    
  	  
	}
	 
	
	});	 
	
	
	
Avaliados.handleKeyDownEvents = function () {

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
    		moveBackward(actualFocused);
    		
    		break;
    		
    		
    		
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
        		moveNext(actualFocused);
        	break;
    		
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		
    		moveNext(actualFocused);
    		
    		
    		break;
    		
    		
    	case tvKey.ENTER: //OK button
    		console.log("OK");
			if (actualFocused == 0) {
				window.location.replace("lista.html");
			}
			else if (actualFocused == 1) {
				
				window.location.replace("busca.html");	
			}
			
			else{
				
				console.log(actualFocused)
				console.log(elems);
				var teste2 = elems[actualFocused];
				console.log(teste2);
				
			
				localStorage.setItem("id_anime", teste2.alt);
				window.location.replace("detalhes.html");
				
				
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



//binding some events
window.onload = Avaliados.onLoad;
window.onunload = Avaliados.onUnload;

/*********************************************** Player *************************************************/

function moveNext(tidx) {
for (var i=elems.length; i--;) {
    var tidx2 = elems[i].getAttribute('tabindex');
    	elems[i].focus();
    	actualFocused = tidx + 1;
    	
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