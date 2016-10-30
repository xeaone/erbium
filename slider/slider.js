(function() {
	'use strict';

	// var X_DOWN = null;

	var handleClick = function (e) {
		setActive(e.target.parentNode);
	};

	// var handleTouchStart = function (e) {
	// 	X_DOWN = e.touches[0].clientX;
	// };
	//
	// var handleTouchMove = function (e) {
	// 	if (!X_DOWN) return;
	//
	// 	var xUp = e.touches[0].clientX;
	//
	// 	var xDiff = X_DOWN - xUp;
	//
	// 	if (xDiff > 0) setActive(e.target.parentNode, 'right');
	// 	else setActive(e.target.parentNode, 'left');
	//
	// 	X_DOWN = null;
	// };

	var setActive = function (slider) {
		var maxIndex = slider.children.length - 1;
		var nextIndex = null;

		var index = slider.getAttribute('data-index');
		index = index ? Number(index) : 0;

		if (index === maxIndex) nextIndex = 0;
		else nextIndex = index + 1;

		var nextChild = slider.children[nextIndex];
		var currentChild = slider.children[index];

		nextChild.style.position = 'static';
		nextChild.style.transform = 'translate3d(0,0,0)';

		currentChild.style.position = 'absolute';
		currentChild.style.transform = 'translate3d(-100vw,0,0)';

		slider.setAttribute('data-index', nextIndex);
	};

	document.addEventListener('DOMContentLoaded', function () {
		var sliders = document.querySelectorAll('.slider');

		for (var i = 0, l = sliders.length; i < l; i++) {
			var slider = sliders[i];
			var images = slider.children;

			// init slider styles
			slider.style.cursor = 'pointer';
			slider.style.overflow = 'hidden';
			slider.style.position = 'relative';

			// init image styles
			for (var c = 0, t = images.length; c < t; c++) {
				if (c === 0) {
					images[c].style.position = 'static';
					images[c].style.transform = 'translate3d(0,0,0)';
				} else {
					images[c].style.position = 'absolute';
					images[c].style.transform = 'translate3d(100vw,0,0)';
				}
			}

			var index = slider.getAttribute('data-index');
			var interval = slider.getAttribute('data-interval');

			index = index ? Number(index) : 0;
			interval = interval ? Number(interval) : 0;

			// interval change
			if (interval > 0) {
				setInterval(function () {
					setActive(slider);
				}, interval);
			}

			// listener
			slider.addEventListener('click', handleClick);
			// slider.addEventListener('touchmove', handleTouchMove);
			// slider.addEventListener('touchstart', handleTouchStart);

		}

	});

}());
