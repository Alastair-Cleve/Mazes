var Cat = function (ctx) {
  this.x = 200;
  this.y = 5;
  this.dx = 5;
  this.dy = 5;
  this.ctx = ctx;
  this.image = new Image();
};

module.exports = Cat;
