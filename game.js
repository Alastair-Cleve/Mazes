var validPositions = require('./constants/positions.js');
var Timer = require('./objects/timer.js');
var Cat = require('./objects/cat.js');
var Fish = require('./objects/fish.js');

var canvas;
var ctx;

var WIDTH = 482;
var HEIGHT = 482;
var img = new Image();
var catImg = new Image();
var cat;

var fish;


var balloons = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
];

var balloon_locations = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0]
];

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

  balloons.forEach(function(balloon, index) {
    ctx.drawImage(balloon, balloon_locations[index][0], balloon_locations[index][1]);
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

  balloons.forEach(function(balloon) {
    balloon.src = "./images/balloon.png";
  })

  setBalloonLocations();

  timer();
  var drawMaze = setInterval(draw, 10);
  return drawMaze;
}

function setBalloonLocations() {
  balloon_locations.forEach(function(balloon) {
    var index = Math.floor(Math.random() * validPositions.length)
    var coords = validPositions[index];
    validPositions.splice(index, 1);
    balloon[0] = coords[0];
    balloon[1] = coords[1];
  })
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
          // fish_locations.splice(index, 1);
          timer.time += 30;
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
      balloon_locations.forEach(function(location, index) {
        if ((Math.abs(cat.x - location[0]) < 20) && (Math.abs(cat.y - location[1]) < 20)) {
          ctx.clearRect(balloon_locations[index][0], balloon_locations[index][1], 15, 15);
          balloons.splice(index, 1);
          balloon_locations.splice(index, 1);
          timer.time -= 30;
        }
      })
    }
  }
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

  if ((timer.time === 0) && !((cat.x + 15) > 441 && (cat.y + 15) > 452)) {
    ctx.fillStyle = "rgba(255, 0, 0, 1.0)";
    ctx.font = "bold 56px Arial";
    ctx.fillText("You've lost!", 105, 241);
    document.getElementById("canvas").style.opacity = "0.5";
  } else if ((cat.x + 15) > 441 && (cat.y + 15) > 452) {
    ctx.fillStyle = "rgba(0, 255, 0, 1.0)";
    ctx.font = "bold 56px Arial";
    ctx.fillText("You've won!", 105, 241);
    document.getElementById("canvas").style.opacity = "0.5";
  }
}

init();
window.addEventListener('keydown', doKeyDown, true);
