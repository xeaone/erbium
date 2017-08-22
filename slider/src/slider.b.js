/*
	@banner
	title: slider
	version: 1.0.5
	author: alexander elias
*/

function overEvent (e) {
	e.currentTarget.setAttribute('data-pause', '');
}

function outEvent (e) {
	e.currentTarget.removeAttribute('data-pause', '');
}

function startEvent (e) {
	var start = e.type === 'touchstart' ? e.changedTouches[0].screenX : e.screenX;
	e.currentTarget.setAttribute('data-start', start);

	if (e.type === 'touchstart') {
		e.currentTarget.setAttribute('data-pause', '');
	}
}

function endEvent (e) {
	var start = parseInt(e.currentTarget.getAttribute('data-start'));
	var end = e.type === 'touchend' ? e.changedTouches[0].screenX : e.screenX;
	move(e.currentTarget, start, end);

	if (e.type === 'touchend') {
		pause(e.currentTarget);
	}
}

function pause (slider) {
	if (!slider.hasAttribute('data-paused')) {
		var interval = parseInt(slider.getAttribute('data-interval')) * 2;

		if (interval > 0) {
			setTimeout(function (s) {
				s.removeAttribute('data-pause');
				s.removeAttribute('data-paused');
			}, interval, slider);
		}

		slider.setAttribute('data-paused', '');
	}
}

function move (slider, start, end) {
	var first = 0;
	var last = slider.children.length - 1;
	var index = parseInt(slider.getAttribute('data-index'));

	if ((index === last && end < start) || (index === first && end > start)) {
		bounce(slider);
	} else if (index <= last && end < start) {
		slider.setAttribute('data-direction', 'left');
		change(slider);
	} else if (index >= first && end > start) {
		slider.setAttribute('data-direction', 'right');
		change(slider);
	}

}

function bounce (slider) {
	var direction = slider.getAttribute('data-direction');
	var index = slider.getAttribute('data-index');
	var x;

	index = index ? parseInt(index) : 0;
	x = direction === 'left' ? '-15vw' : '15vw';
	slider.children[index].style.transform = 'translate3d(' + x + ',0,0)';

	setTimeout(function () {
		slider.children[index].style.transform = 'translate3d(0,0,0)';
	}, 150);
}

function change (slider) {
	var direction = slider.getAttribute('data-direction');
	var index = slider.getAttribute('data-index');
	var maxIndex = slider.children.length - 1;
	var oldIndex = null;
	var newIndex = null;
	var minIndex = 0;
	var x = null;

	index = index ? parseInt(index) : 0;
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
}

function setupSlides (slider) {
	var index = slider.getAttribute('data-index');
	index = index ? parseInt(index) : 0;

	for (var i = 0, l = slider.children.length; i < l; i++) {
		var slide = slider.children[i];

		if (slide.nodeName === 'IMG') slide.style.pointerEvents = 'none';

		slide.style.top = '0';
		slide.style.left = '0';

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
}


document.addEventListener('DOMContentLoaded', function () {
	var sliders = document.querySelectorAll('.slider');

	for (var i = 0, l = sliders.length, slider, interval; i < l; i++) {
		slider = sliders[i];

		slider.style.cursor = 'pointer';
		slider.style.overflow = 'hidden';
		slider.style.position = 'relative';

		setupSlides(slider);

		interval = slider.getAttribute('data-interval');

		if (interval === null || interval === undefined) {
			slider.getAttribute('data-interval', 0);
		} else {
			interval = interval ? parseInt(interval) : 0;
		}

		if (interval > 0 && interval < 500) {
			interval = 500;
			slider.setAttribute('data-interval', interval);
		}

		if ('ontouchstart' in document) {
			slider.addEventListener('touchstart', startEvent);
			slider.addEventListener('touchend', endEvent);
		} else {
			slider.addEventListener('mouseout', outEvent);
			slider.addEventListener('mouseover', overEvent);
			slider.addEventListener('mousedown', startEvent);
			slider.addEventListener('mouseup', endEvent);
		}

		if (interval > 0) {
			setInterval(function (s) {
				if (!s.hasAttribute('data-pause')) {
					change(s);
				}
			}, interval, slider);
		}

	}

});
