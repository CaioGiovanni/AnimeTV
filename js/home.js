var Home = {};
var elems;
var actualFocused;
var teste;
//var Player = document.getElementById('player');
const main = document.getElementById('main');
var temp;

//called when application was loaded
Home.onLoad = function () {
	console.log("Home.onLoad()");
	
	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("home.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Home.handleKeyDownEvents();
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

	 for(var i = 0; i < 4; i++){    
  	    //criar elemento div
  	   
  	   	if(teste[i].score>88){
  	   	console.log(teste[i].cover_image);	
  	    var div = document.createElement("div");
  	    div.classList.add("col-lg-3")
  	   	div.innerHTML= `
  	   <img alt="${teste[i].id}" style="padding:.5em;" src=${teste[i].cover_image} tabindex=${i+3} 
  		  class="img-responsive container focusable imagem" id="capa_anime" onclick="verDetalhes(${teste[i].id});">
  
  	   	`
  	   	
  		document.getElementById("slide_avaliados").appendChild(div); //adicionando imagem como filha de demo
    	  
  	   	}
  	    
  	  }
	
	});	  



//romance
var responseUrl2 = "https://api.aniapi.com/v1/anime?&genres=Romance";
fetch(responseUrl2, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	teste = json.data.documents;

	 for(var i = 8; i < 12; i++){    
  	    //criar elemento div
  	   
  	   	if(teste[i].score>80){
  	   	console.log(teste[i].cover_image);	
  	    var div = document.createElement("div");
  	    div.classList.add("col-lg-3")
  	   	div.innerHTML= `
  	   <img alt="capa anime" style="padding:.5em;" src=${teste[i].cover_image} tabindex=${i+3} 
  		  class="img-responsive container focusable imagem" id="capa_anime">
  
  	   	`
  	   	
  		document.getElementById("slide_romance").appendChild(div); //adicionando imagem como filha de demo
    	  
  	   	}
  	    
  	  }
	
	});	  

//acao
var responseUrl3 = "https://api.aniapi.com/v1/anime?&genres=Action,War,Adventure";
fetch(responseUrl3, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	teste = json.data.documents;

	 for(var i = 14; i < 18; i++){    
  	    //criar elemento div
  	   
  	   	if(teste[i].score>85){
  	   	console.log(teste[i].cover_image);	
  	    var div = document.createElement("div");
  	    div.classList.add("col-lg-3")
  	   	div.innerHTML= `
  	   <img alt="" style="padding:.5em;" src=${teste[i].cover_image} tabindex=${i+3} 
  		  class="img-responsive container focusable imagem" id="capa_anime">
  
  	   	`
  	   	
  		document.getElementById("slide_acao").appendChild(div); //adicionando imagem como filha de demo
    	  
  	   	}
  	    
  	  }
	
	});	 
	



// called when application has closed


Home.onUnload = function () {
	console.log("Home.onUnload()");
	
};



// handle all keydown events triggered through remote control.
Home.handleKeyDownEvents = function () {

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
    		if (actualFocused <=16 && actualFocused>12) {
    			moveBackward(13)
        	}
    		else if (actualFocused <=11 && actualFocused>8) {
    			moveBackward(8)
        	}
    		else if (actualFocused <=6 && actualFocused>2) {
    			moveBackward(3)
        	}
    	
    		else if(actualFocused == 2){
    			moveBackward(2)
    		}
    		
    		else if(actualFocused == 7){
    			moveBackward(7)
    		}
    		else if(actualFocused == 12){
    			moveBackward(12)
    		}
    		
    		break;
    		
    		
    		
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		
    		if (!(actualFocused == 6 || actualFocused == 11 || actualFocused == 16 )) {
        		
        		moveNext(actualFocused);
        	}
    		else if (actualFocused ==2 || actualFocused==7 || actualFocused==12) {
        		
        		moveNext(actualFocused);
        	}
    		
    		
    		break;
    		
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		
    		if (actualFocused<=1) {
    			elems[2].focus();
				actualFocused = 2;
	    	 
        	}
    		else if(actualFocused <= 2){
    			moveNext(2);
    		}
    		else if(actualFocused <= 6 && actualFocused >= 3){
    			elems[7].focus();
	        	actualFocused = 7;
    			
    		}
    		else if (actualFocused <= 11 && actualFocused >= 8){
    			elems[12].focus();
	        	actualFocused = 12;
    			
    		}
    		else if(actualFocused <= 7){
    			elems[8].focus();
	        	actualFocused = 8;
    		}
    		else if(actualFocused <= 12){
    			elems[13].focus();
	        	actualFocused = 13;
    		}
    		
    		
    		break;
    		
    		
    	case tvKey.ENTER: //OK button
    		console.log("OK");
			if (actualFocused == 0) {
				window.location.replace("lista.html");
			}
			else if (actualFocused == 1) {
				
				window.location.replace("busca.html");	
			}
			else if (actualFocused==2) {
				
				window.location.replace("avaliados.html");
			}
			else if (actualFocused ==7) {
				window.location.replace("romance.html");
			}
			else if (actualFocused ==12) {
				window.location.replace("acao.html");
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

// binding some events
window.onload = Home.onLoad;
window.onunload = Home.onUnload;

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