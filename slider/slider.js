(function() {
	'use strict';

	var MOUSE_OVER = false;
	var TOUCHED = false;
	var START_X = 0;
	var END_X = 0;

	var gesture = function (e) {
		if (END_X < START_X) {
			e.currentTarget.setAttribute('data-direction', 'left');
			changeSlide(e.currentTarget);
		} else if (END_X > START_X) {
			e.currentTarget.setAttribute('data-direction', 'right');
			changeSlide(e.currentTarget);
		}
	};

	var click = function (e) {
		if (!TOUCHED) changeSlide(e.currentTarget);
	};

	var mouseOver = function () {
		MOUSE_OVER = true;
	};

	var mouseOut = function () {
		MOUSE_OVER = false;
	};

	var touchStart = function (e) {
		TOUCHED = true;
		START_X = e.changedTouches[0].screenX;
	};

	var touchEnd = function (e) {
		END_X = e.changedTouches[0].screenX;
		gesture(e);
	};

	var setSlides = function (slider) {
		var index = slider.getAttribute('data-index');
		index = index ? Number(index) : 0;

		for (var i = 0, l= slider.children.length; i < l; i++) {
			var slide = slider.children[i];

			if (slide.nodeName === 'IMG') slide.style.pointerEvents = 'none';

			if (i === index) {
				slide.style.position = 'static';
				slide.style.transform = 'translate3d(0,0,0)';
			} else if (i > index) {
				slide.style.position = 'absolute';
				slide.style.transform = 'translate3d(100vw,0,0)';
			} else if (i < index) {
				slide.style.position = 'absolute';
				slide.style.transform = 'translate3d(-100vw,0,0)';
			}
		}
	};

	var changeSlide = function (slider) {
		var direction = slider.getAttribute('data-direction');
		var index = slider.getAttribute('data-index');
		var maxIndex = slider.children.length - 1;
		var oldIndex = null;
		var newIndex = null;
		var minIndex = 0;
		var x = null;

		index = index ? Number(index) : 0;
		direction = direction !== 'left' && direction !== 'right' ? direction = 'left' : direction;

		if (direction === 'left' && index === maxIndex) direction = 'right';
		else if (direction === 'right' && index === minIndex)  direction = 'left';

		slider.setAttribute('data-direction', direction);

		if (direction === 'left') {
			x = '-100vw';
			newIndex = index + 1;
			oldIndex = index;
		} else if (direction === 'right') {
			x = '100vw';
			newIndex = index - 1;
			oldIndex = index;
		}

		var newSlide = slider.children[newIndex];
		var oldSlide = slider.children[oldIndex];

		newSlide.style.position = 'static';
		newSlide.style.transform = 'translate3d(0,0,0)';

		oldSlide.style.position = 'absolute';
		oldSlide.style.transform = 'translate3d(' + x + ',0,0)';

		slider.setAttribute('data-index', newIndex);
	};

	document.addEventListener('DOMContentLoaded', function () {
		var sliders = document.querySelectorAll('.slider');

		sliders.forEach(function (slider) {

			// init slider styles
			slider.style.cursor = 'pointer';
			slider.style.overflow = 'hidden';
			slider.style.position = 'relative';

			// init slides
			setSlides(slider);

			var interval = slider.getAttribute('data-interval');
			interval = interval ? Number(interval) : 0;

			// interval change
			if (interval > 0) {
				setInterval(function () {
					if (!MOUSE_OVER) changeSlide(slider);
				}, interval);
			}

			// listener
			slider.addEventListener('click', click);

			slider.addEventListener('mouseout', mouseOut);
			slider.addEventListener('mouseover', mouseOver);

			slider.addEventListener('touchstart', touchStart);
			slider.addEventListener('touchend', touchEnd);
		});

	});

}());
