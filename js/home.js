var Home = {};
var elems;
var actualFocused;
var teste;
//var Player = document.getElementById('player');
const main = document.getElementById('main');
//called when application was loaded
Home.onLoad = function () {
	console.log("Home.onLoad()");
	elems = document.getElementsByClassName('focusable');
	moveNext(-1);
	
	// setup handler to key events
	Home.handleKeyDownEvents();
};

var responseUrl = "https://api.aniapi.com/v1/anime";
fetch(responseUrl, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	console.log(json.data.documents[1].cover_image);
	document.getElementById("capa_anime1").src = json.data.documents[1].cover_image;
	teste = json.data.documents;
	});	  
	
// called when application has closed
Home.onUnload = function () {
	console.log("Home.onUnload()");
};



 
function showAnimes() {
	main.innerHTML='';
	const myJSON = JSON.stringify(teste);
	document.getElementById("demo").innerHTML = myJSON;
	for ( var i in teste) {
		var div = document.createElement('div');
		
		main.innerHTML = '<div> <img src="${teste[a].cover_image}"></div>'
       
    }
}

/*function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Know More</button
            </div>
        
        `

        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
          console.log(id)
          openNav(movie)
        })
    })
}
 * 
 * 
 * 
 */


 

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
    		if (actualFocused == 5) {
    			moveNext(1);
        	}
    		else if (actualFocused < 5) {
    			moveBackward(actualFocused)
        	}
    		break;
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		
    		if (actualFocused < 5 && actualFocused!=1) {
        		
        		moveNext(actualFocused);
        	}
    		else if (actualFocused >= 6 && actualFocused!=10) {
        		
        		moveNext(actualFocused);
        	}
    		
    		
    		break;
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		
    		if (actualFocused<=1) {
				moveNext(actualFocused);
	    		
        	}
    		else if (actualFocused <= 5 && actualFocused >= 2){
    			elems[6].focus();
	        	actualFocused = 6;
    			
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
			else if (actualFocused >=2) {
				window.location.replace("detalhes.html");
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