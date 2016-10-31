var touchStartX = 0;
var touchStartY = 0;
var touchEndX = 0;
var touchEndY = 0;

var touchStart = function (e) {
	touchStartX = e.changedTouches[0].screenX;
	touchStartY = e.changedTouches[0].screenY;
};

var touchEnd = function (e) {
	touchEndX = e.changedTouches[0].screenX;
	touchEndY = e.changedTouches[0].screenY;
	gesture();
};

var gesture = function () {
	if (touchEndX < touchStartX) {
		console.log('left');
	} else if (touchEndX > touchStartX) {
		console.log('right');
	} else if (touchEndY < touchStartY) {
		console.log('down');
	} else if (touchEndY > touchStartY) {
		console.log('up');
	} else if (touchEndY === touchStartY) {
		console.log('tap');
	}
};

var element = document.querySelector('gesture');

element.addEventListener('touchstart', touchStart);
element.addEventListener('touchend', touchEnd);
