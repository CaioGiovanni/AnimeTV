var Main = {};
var anime = localStorage.getItem("id_anime");
var animeEpisode = localStorage.getItem("actualEpisode"); 
var temp;

//var Player = document.getElementById('player');

//called when application was loaded
Main.onLoad = function () {
	console.log("Main.onLoad()");

	temp = localStorage.getItem('lastPages');
	temp = JSON.parse(temp);
	temp.push("play.html");	
	localStorage.setItem("lastPages", JSON.stringify(temp));
	
	//enabling media keys
	//Main.enableMediaKeys();
	
	// setup handler to key events
	Main.handleKeyDownEvents();
	
	// setup video player
	//Player.init("player");
	//Player.prepare("https://api.aniapi.com/v1/proxy/https%3a%2f%2fcdn2.dreamsub.cc%2ffl%2fcowboy-bebop%2f11%2fSUB_ITA%2f480p%3ftoken%3dAYpZufjvL9sfSiwWkynBoPmuV6USuQdvr2wKiVjsQKJ90TAhPRFuhe5ePq6VTlEy/dreamsub/?host=cdn.dreamsub.cc&referrer=https%3a%2f%2fdreamsub.cc%2fanime%2fcowboy-bebop%2f11"); // <-- set video URL here!
};
var responseUrl = "https://api.aniapi.com/v1/episode?anime_id=" + anime + "&source=dreamsub&locale=it";
fetch(responseUrl, {
	  method: "GET",
	  headers: {"Content-type": "application/json;charset=UTF-8"}
	})
	.then(response => response.json()) 
	.then(json => {console.log(json);
	console.log(json.data);
	for (i = 0; i < json.data.documents.length; i++) {
		if (json.data.documents[i].number == animeEpisode) {
			document.getElementById("player").src = json.data.documents[i].video;
			console.log(document.getElementById("player").src);
		}
	}
	});	

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
        	/* Move 10 seconds back */
    		seekTime = Player.videoElem.currentTime - 10;
    		if (seekTime <= 0) {
    			seekTime = 0;
    		}
    		Player.videoElem.currentTime = seekTime;
    		break;
    	case tvKey.UP: //UP arrow
    		console.log("UP");
    		break;
    	case tvKey.RIGHT: //RIGHT arrow
    		console.log("RIGHT");
    		var seekTime = Player.videoElem.currentTime + 10;
    		if (seekTime >= Player.videoElem.duration) {
    			seekTime = Player.videoElem.duration;
    		}
    		Player.videoElem.currentTime = seekTime;
    		break;
    	case tvKey.DOWN: //DOWN arrow
    		console.log("DOWN");
    		break;
    	case tvKey.ENTER: //OK button
    		console.log("OK");
    		if (Player.videoElem.state == true) {
    			Player.pause();
    		} else {
    			Player.play();
    		}    
    		break;
    	case tvKey.RETURN: //RETURN button
    		console.log("RETURN");
    		temp.pop();
    		const temp2 = temp.pop();
    		localStorage.setItem("lastPages", JSON.stringify(temp));
    		window.location.replace(temp2);
    		break;
    	case tvKey.PLAYPAUSE: // PLAYPAUSE button
    		console.log("PLAYPAUSE");
    		if (Player.state == Player.STATES.PLAYING) {
    			Player.pause();
    		} else {
    			Player.play();
    		}    		
    		break;
    	case tvKey.PLAY: // PLAY button
    		console.log("PLAY");
    		Player.play();
    		break;
    	case tvKey.PAUSE: // PAUSE button
    		console.log("PAUSE");
    		Player.pause();
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

(function(){
	
	var Player = {
		videoElem: document.getElementById('player'),	// tag video
		STATES: {
	        STOPPED: 0,
	        PLAYING: 1,
	        PAUSED: 2, 
	        PREPARED: 4
	    },
	    state: 0			// initial state: STOPPED
	};
	
	// Initialize player
	Player.init = function (id) {
		
		console.log("Player.init("+id+")");
		
		this.state = this.STATES.STOPPED;
		
		if (!this.videoElem && id) {
			this.videoElem = document.getElementById(id);
		}
		
		Player.setupEventListeners();
	};
	
	// Load video.
	Player.prepare = function (url) {
		
		console.log("Player.prepare("+url+")");		
		
		if (this.state > this.STATES.STOPPED) {
			return;
		}
		
		if (!this.videoElem) {
			return 0;
		}
		
		this.videoElem.src = url;
		this.videoElem.load();		
	};
	
	// Play video
	Player.play = function (url) {
		
		console.log("Player.play("+url+")");
		
		if (this.videoElem.state < this.STATES.PAUSED) {
			console.log("entrou")
			return;
		}
		
		this.videoElem.state = this.STATES.PLAYING;
		
		if (url) {
			this.videoElem.src = url;
		}
		this.videoElem.play();		
	};
	
	// Pause video
	Player.pause = function () {
		
		console.log("Player.pause()");
		
		if (this.videoElem.state != this.STATES.PLAYING) {
			console.log("entrou2")
			return;
		}
		
		this.videoElem.state = this.STATES.PAUSED;
		
		this.videoElem.pause();
		
	};
	
	// Stop video
	Player.stop = function () {
		
		console.log("Player.stop()");
		
		this.state = this.STATES.STOPPED;
		
		if (this.videoElem.readyState > 0) {
			this.videoElem.src = "";
		}
	};
	
	// Set position and dimension of video area 
	Player.setDisplayArea = function (x, y, width, height) {
		
		if (!this.videoElem) {
			return 0;
		}
		
		this.videoElem.style.top = x + "px";
		this.videoElem.style.top = y + "px";
		this.videoElem.style.width = width + "px";
		this.videoElem.style.height = height + "px";
	};
	
	// format time in seconds to hh:mm:ss
	Player.formatTime = function (seconds) {
				
		var hh = Math.floor(seconds / 3600),
   		    mm = Math.floor(seconds / 60) % 60,
		    ss = Math.floor(seconds) % 60;
		  
		return (hh ? (hh < 10 ? "0" : "") + hh + ":" : "") + 
			   ((mm < 10) ? "0" : "") + mm + ":" + 
			   ((ss < 10) ? "0" : "") + ss;			
	};
	
	// Setup Listeners for video player events
	Player.setupEventListeners = function () {
	
		if (!this.videoElem) {
			return 0;
		}
		
		var that = this;
		
		// triggered when video metadata was loaded, i.e. duration dimensions etc
		this.videoElem.addEventListener('loadedmetadata', function() {
			console.log("Video metadata info was loaded");
			that.state = that.STATES.PREPARED;
			document.getElementById("total-time").innerHTML = that.formatTime(that.videoElem.duration);
		}, false);
		
		// triggered when video has ended.
		this.videoElem.addEventListener('ended', function() {
			console.log("Video ended");
			that.state = that.STATES.PREPARED;
		}, false);
		
		// triggered when playing has changed
		this.videoElem.addEventListener('timeupdate', function () {
			
        }, false);

		// triggered when the browser is in the process of getting the media data
        this.videoElem.addEventListener('progress', function () {
        	console.log("Buffering...");
        }, false);

        // triggered when a file is ready to start playing (when it has buffered enough to begin)
        this.videoElem.addEventListener('canplay', function () {
        	console.log('Buffering Complete, Can play now!');
        }, false);
				
		// triggered when some error during video happens
		this.videoElem.addEventListener('error', function(e) {
			console.log("Some error had happened: " + e);
		}, false);
        
	};	
	
	if (!window.Player) {
		window.Player = Player;
	}
	
})();