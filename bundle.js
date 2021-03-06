/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var validPositions = __webpack_require__(1);
	var Timer = __webpack_require__(2);
	var Cat = __webpack_require__(3);
	var Fish = __webpack_require__(4);
	var Balloon = __webpack_require__(5);
	var solve = __webpack_require__(6);
	
	var canvas;
	var ctx;
	
	var WIDTH = 482;
	var HEIGHT = 482;
	var img = new Image();
	var catImg = new Image();
	var cat;
	
	var fish;
	var balloons;
	
	var collision = 0;
	
	function clear() {
	  ctx.drawImage(img, 0, 0);
	
	  //These represent the exit triangle.
	  ctx.moveTo(441, 452);
	  ctx.lineTo(448, 466);
	  ctx.stroke();
	
	  ctx.moveTo(448, 466);
	  ctx.lineTo(455, 452);
	  ctx.stroke();
	
	  ctx.moveTo(455, 452);
	  ctx.lineTo(441, 452);
	  ctx.stroke();
	
	  fish.forEach(function(fish) {
	    ctx.drawImage(fish.image, fish.location[0], fish.location[1]);
	  })
	
	  balloons.forEach(function(balloon) {
	    ctx.drawImage(balloon.image, balloon.location[0], balloon.location[1]);
	  })
	}
	
	function init() {
	  canvas = document.getElementById("canvas");
	  ctx = canvas.getContext("2d");
	  cat = new Cat(ctx);
	  cat.image.src = "./images/cat.png";
	  img.src = "./images/maze.gif";
	
	  fish = [];
	  for(var i = 0; i < 5; i++) {
	    fish.push(new Fish ());
	    fish[i].image.src = "./images/fish.png";
	    fish[i].setLocation();
	  }
	
	  balloons = [];
	  for(var i = 0; i < 5; i++) {
	    balloons.push(new Balloon ());
	    balloons[i].image.src = "./images/balloon.png";
	    balloons[i].setLocation();
	  }
	
	  // timer();
	  var drawMaze = setInterval(draw, 10);
	  return drawMaze;
	}
	
	function timer() {
	  timer = new Timer();
	  timer.start();
	}
	
	function doKeyDown(evt){
	  switch (evt.keyCode) {
	    case 38:  //Up Arrow
	      if (cat.y - cat.dy > 0) {
	        cat.y -= cat.dy;
	        clear();
	        checkForFish();
	        checkForBalloons();
	        checkcollision();
	        if (collision == 1) {
	          cat.y += cat.dy;
	          collision = 0;
	        }
	      }
	      checkIfWon();
	      break;
	    case 40:  //Down Arrow
	      if (cat.y + cat.dy < HEIGHT ) {
	        cat.y += cat.dy;
	        clear();
	        checkForFish();
	        checkForBalloons();
	        checkcollision();
	        if (collision == 1) {
	          cat.y -= cat.dy;
	          collision = 0;
	        }
	      }
	      checkIfWon();
	      break;
	    case 37:  //Left Arrow
	      if (cat.x - cat.dx > 0) {
	        cat.x -= cat.dx;
	        clear();
	        checkForFish();
	        checkForBalloons();
	        checkcollision();
	        if (collision == 1) {
	          cat.x += cat.dx;
	          collision = 0;
	        }
	      }
	      checkIfWon();
	      break;
	    case 39:  //Right Arrow
	      if ((cat.x + cat.dx < WIDTH)) {
	        cat.x += cat.dx;
	        clear();
	        checkForFish();
	        checkForBalloons();
	        checkcollision();
	        if (collision == 1) {
	          cat.x -= cat.dx;
	          collision = 0;
	        }
	      }
	      checkIfWon();
	      break;
	  }
	}
	
	function checkcollision() {
	  var imgd = ctx.getImageData(cat.x, cat.y, 15, 15);
	  var pix = imgd.data;
	  for (var i = 0; n = pix.length, i < n; i += 4) {
	    if (pix[i] == 0) {
	      collision = 1;
	    }
	  }
	}
	
	function checkForFish() {
	  var imgd = ctx.getImageData(cat.x, cat.y, 15, 15);
	  var pix = imgd.data;
	  for (var i = 0; n = pix.length, i < n; i += 4) {
	    if (pix[i] > 0 && pix[i] < 140) {
	      fish.forEach(function(_fish, index) {
	        if ((Math.abs(cat.x - _fish.location[0]) < 20) && (Math.abs(cat.y - _fish.location[1]) < 20)) {
	          ctx.clearRect(_fish.location[0], _fish.location[1], 15, 15);
	          fish.splice(fish.indexOf(_fish), 1);
	          timer.time += 30;
	          document.getElementById('message-green').style.display = "block";
	          setTimeout(function () {
	            document.getElementById('message-green').style.display = "none";
	          }, 5000);
	        }
	      })
	    }
	  }
	}
	
	function checkForBalloons() {
	  var imgd = ctx.getImageData(cat.x, cat.y, 15, 15);
	  var pix = imgd.data;
	  for (var i = 0; n = pix.length, i < n; i += 4) {
	    if (pix[i] === 140) {
	      balloons.forEach(function(balloon, index) {
	        if ((Math.abs(cat.x - balloon.location[0]) < 20) && (Math.abs(cat.y - balloon.location[1]) < 20)) {
	          ctx.clearRect(balloon.location[0], balloon.location[1], 15, 15);
	          balloons.splice(balloons.indexOf(balloon), 1);
	          // balloon_locations.splice(index, 1);
	          timer.time -= 30;
	          document.getElementById('message-red').style.display = "block";
	          setTimeout(function () {
	            document.getElementById('message-red').style.display = "none";
	          }, 5000);
	        }
	      })
	    }
	  }
	}
	
	function checkforSolution() {
	  var imgd = ctx.getImageData(200, 25, 15, 15);
	  var pix = imgd.data;
	  for (var i = 0; n = pix.length, i < n; i += 4) {
	    if (pix[i] === 119) {
	      return true;
	    }
	  }
	  return false;
	}
	
	function checkIfWon() {
	  if ((cat.x + 15) > 441 && (cat.y + 15) > 452) {
	    ctx.font = "30px Arial";
	    ctx.fillText("You've won!", 241, 241);
	  }
	}
	
	function draw() {
	  clear();
	  ctx.drawImage(cat.image, cat.x, cat.y);
	
	  ctx.fillStyle = "MidnightBlue";
	
	  if ((timer.time < 1) && !((cat.x + 15) > 441 && (cat.y + 15) > 452)) {
	    timer.stop();
	    ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
	    ctx.font = "bold 56px Arial";
	    ctx.fillText("You've lost!", 105, 241);
	    document.getElementById("canvas").style.opacity = "0.5";
	    window.removeEventListener('keydown', doKeyDown, false);
	  } else if ((cat.x === 425 && cat.y === 440) || (cat.x === 425 && cat.y === 445)) {
	    timer.stop();
	    ctx.fillStyle = "rgba(0, 255, 0, 1.0)";
	    ctx.font = "bold 56px Arial";
	    ctx.fillText("You've won!", 105, 241);
	    document.getElementById("canvas").style.opacity = "0.5";
	    window.removeEventListener('keydown', doKeyDown, false);
	  }
	}
	
	init();
	document.getElementById("play-button").addEventListener('click', function () {
	  if (!checkforSolution()) {
	    timer();
	    window.addEventListener('keydown', doKeyDown, false);
	  } else {
	    alert("You must restart the game.")
	  }
	});
	
	document.getElementById("restart-button").addEventListener('click', function () {
	  location.reload();
	});
	
	document.getElementById("solve-button").addEventListener('click', function () {
	  solve(ctx);
	  if (timer.time > 1) {
	    timer.stop();
	  }
	  window.removeEventListener('keydown', doKeyDown, false);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var positions = [
	  [330, 310],
	  [245, 330],
	  [315, 355],
	  [70, 245],
	  [90, 265],
	  [110, 245],
	  [175, 265],
	  [25, 155],
	  [25, 220],
	  [25, 310],
	  [70, 310],
	  [115, 220],
	  [45, 290],
	  [45, 180],
	  [65, 155],
	  [200, 135],
	  [220, 70],
	  [180, 110],
	  [155, 155],
	  [25, 25],
	  [90, 90],
	  [90, 200],
	  [155, 155],
	  [285, 25],
	  [445, 25],
	  [420, 155],
	  [245, 400],
	  [180, 400],
	  [180, 310],
	  [265, 310],
	  [310, 265],
	  [265, 245],
	  [355, 245],
	  [355, 220],
	  [375, 270],
	  [90, 420],
	  [70, 400],
	  [110, 400],
	  [110, 440],
	  [195, 440],
	  [265, 405],
	  [265, 405],
	  [265, 375],
	  [70, 440],
	  [45, 440],
	  [45, 400],
	  [25, 440],
	  [25, 330],
	  [90, 330],
	  [90, 290],
	  [200, 265],
	  [225, 290],
	  [245, 245],
	  [440, 270],
	  [400, 355],
	  [400, 200],
	  [330, 180],
	  [265, 200],
	  [330, 220],
	  [180, 220]
	];
	
	module.exports = positions;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Timer = function () {
		this.time = (60 * 3);
		this.domEl = document.getElementById("timer");
	};
	
	Timer.prototype.start = function () {
		this.timer = setInterval(function() {
			this.time -= 1;
			this.domEl.innerHTML = this.render(this.time);
		}.bind(this), 1000);
		return timer;
	};
	
	Timer.prototype.stop = function () {
		clearInterval(this.timer);
	};
	
	Timer.prototype.render = function (seconds) {
		if (seconds < 1) {
			clearInterval(this.timer);
		}
		if (seconds > 60 && seconds < 120) {
			if (seconds === 61) {
				return ("1 minute and 1 second remaining");
			} else {
				return ("1 minute and " + (seconds % 60) + " seconds remaining");
			}
		} else if (seconds >= 60) {
			if (seconds % 60 === 1) {
			  return ("" + Math.floor(seconds / 60) + " minutes and 1 second remaining");
			} else {
				return ("" + Math.floor(seconds / 60) + " minutes and " + (seconds % 60) + " seconds remaining");
			}
		} else {
			if (seconds === 1) {
				return ("1 second remaining");
			} else {
				return ("" + seconds + " seconds remaining");
			}
		}
	};
	
	module.exports = Timer;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Cat = function (ctx) {
	  this.x = 200;
	  this.y = 5;
	  this.dx = 5;
	  this.dy = 5;
	  this.ctx = ctx;
	  this.image = new Image();
	};
	
	module.exports = Cat;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var validPositions = __webpack_require__(1);
	
	var Fish = function () {
	  this.image = new Image();
	  this.location = [0, 0];
	};
	
	Fish.prototype.setLocation = function () {
	  var index = Math.floor(Math.random() * validPositions.length);
	  var coords = validPositions[index];
	  validPositions.splice(index, 1);
	  this.location[0] = coords[0];
	  this.location[1] = coords[1];
	};
	
	module.exports = Fish;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var validPositions = __webpack_require__(1);
	
	var Balloon = function () {
	  this.image = new Image();
	  this.location = [0, 0];
	};
	
	Balloon.prototype.setLocation = function () {
	  var index = Math.floor(Math.random() * validPositions.length);
	  var coords = validPositions[index];
	  validPositions.splice(index, 1);
	  this.location[0] = coords[0];
	  this.location[1] = coords[1];
	};
	
	module.exports = Balloon;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function (ctx) {
	
	  var coords = [
	    [200, 25],
	    [90, 25],
	    [90, 45],
	    [45, 45],
	    [45, 25],
	    [25, 25],
	    [25, 70],
	    [45, 70],
	    [45, 90],
	    [90, 90],
	    [90, 200],
	    [110, 200],
	    [110, 155],
	    [135, 155],
	    [135, 135],
	    [110, 135],
	    [110, 45],
	    [225, 45],
	    [225, 25],
	    [245, 25],
	    [245, 45],
	    [335, 45],
	    [335, 25],
	    [420, 25],
	    [420, 155],
	    [440, 155],
	    [440, 355],
	    [400, 355],
	    [400, 200],
	    [355, 200],
	    [355, 155],
	    [290, 155],
	    [290, 180],
	    [220, 180],
	    [220, 70],
	    [200, 70],
	    [200, 115],
	    [180, 115],
	    [180, 155],
	    [155, 155],
	    [155, 225],
	    [70, 225],
	    [70, 155],
	    [25, 155],
	    [25, 310],
	    [70, 310],
	    [70, 245],
	    [115, 245],
	    [115, 265],
	    [135, 265],
	    [135, 245],
	    [245, 245],
	    [245, 265],
	    [200, 265],
	    [200, 290],
	    [90, 290],
	    [90, 335],
	    [25, 335],
	    [25, 400],
	    [45, 400],
	    [45, 445],
	    [70, 445],
	    [70, 400],
	    [115, 400],
	    [115, 445],
	    [265, 445],
	    [265, 375],
	    [245, 375],
	    [245, 400],
	    [180, 400],
	    [180, 310],
	    [265, 310],
	    [265, 245],
	    [355, 245],
	    [355, 220],
	    [375, 220],
	    [375, 335],
	    [355, 335],
	    [355, 265],
	    [335, 265],
	    [335, 290],
	    [290, 290],
	    [290, 335],
	    [245, 335],
	    [245, 355],
	    [375, 355],
	    [375, 400],
	    [355, 400],
	    [355, 420],
	    [420, 420],
	    [420, 445]
	  ];
	
	  for (var i = 0; i < coords.length - 1; i++) {
	    ctx.moveTo(coords[i][0] + 7, coords[i][1] + 7);
	    ctx.lineTo(coords[i + 1][0] + 7, coords[i + 1][1] + 7);
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = 'cornflowerblue';
	    ctx.stroke();
	  }
	
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map