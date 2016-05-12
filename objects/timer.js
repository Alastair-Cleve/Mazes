var Timer = function () {
	this.time = (60 * 10);
	this.domEl = document.getElementById("timer");
};

Timer.prototype.start = function () {
	this.timer = setInterval(function() {
		this.time -= 1;
		this.domEl.innerHTML = this.render(this.time);
	}.bind(this), 1000);
	return timer;
};

Timer.prototype.render = function (seconds) {
	if (seconds === 0) {
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
