var validPositions = require('../constants/positions.js');

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
