/*
	version: 1.0.1
	title: erbium gallery
	author: alexander elias
*/

import { sStyle } from './ignore/style.js';

var nStyle = document.createTextNode(sStyle);
var eStyle = document.createElement('style');
eStyle.appendChild(nStyle);
document.head.appendChild(eStyle);

function create (gallery, items) {
	var img = document.createElement('img');
	var eViewer = document.createElement('div');
	var eContainer = document.createElement('div');
	var eContainerWrap = document.createElement('div');
	var eClose = document.createElement('div');
	var eArrowLeft = document.createElement('div');
	var eArrowRight = document.createElement('div');
	var eArrowLeftWrap = document.createElement('div');
	var eArrowRightWrap = document.createElement('div');

	items = items || gallery.children;

	var xDown = null;
	var l = items.length;
	var first = 0;
	var last = l-1;

	function getCurrent () {
		return Number(gallery.getAttribute('data-c'));
	}

	function setCurrent (current) {
		gallery.setAttribute('data-c', current);
	}

	function scrollImages (current) {
		setCurrent(current);

		var images = eContainer.children;
		var x = current * 100;

		for (var i = 0, l = images.length; i < l; i++) {
			images[i].style.transform = 'translate3d(-' + x + '%,0,0)';
		}
	}

	function handleActive () {
		var isAcive = gallery.classList.toggle('active');
		if (isAcive) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'initial';
	}

	function handleRight () {
		var current = getCurrent();
		if (current < last) current++;
		scrollImages(current);
	}

	function handleLeft () {
		var current = getCurrent();
		if (current > first) current--;
		scrollImages(current);
	}

	function handleTouchStart (e) {
		xDown = e.touches[0].clientX;
	}

	function handleTouchMove (e) {
		if (!xDown) return;

		var xUp = e.touches[0].clientX;
		var xDiff = xDown - xUp;

		// bind e-arrow-left-wrap and e-arrow-right-wrap
		if (xDiff > 0) handleRight.call(this.previousElementSibling);
		else handleLeft.call(this.nextElementSibling);

		xDown = null;
	}

	gallery.classList.add('e-gallery');
	eViewer.classList.add('e-viewer');
	eContainer.classList.add('e-container');
	eContainerWrap.classList.add('e-container-wrap');
	eClose.classList.add('e-close');
	eArrowLeft.classList.add('e-arrow-left');
	eArrowRight.classList.add('e-arrow-right');
	eArrowLeftWrap.classList.add('e-arrow-left-wrap');
	eArrowRightWrap.classList.add('e-arrow-right-wrap');

	for (var i = 0; i < l; i++) {
		var item = items[i];

		if (!item) continue;

		var alt = null;
		var image = null;

		switch (item.constructor.name) {
			case 'String': {
				image = img.cloneNode();
				alt = item.split('/').pop().replace(/(-)|(\.)/g, ' ');
				image.setAttribute('alt', alt);
				image.setAttribute('src', item);
			}
				break;
			case 'Object': {
				image = img.cloneNode();
				image.setAttribute('alt', item.alt);
				image.setAttribute('src', item.src);
			}
				break;
			case 'HTMLImageElement': {
				image = item;
			}
				break;
		}

		image.setAttribute('data-i', i);
		eContainer.appendChild(image.cloneNode());

		image.addEventListener('click', function () {
			var current = Number(this.getAttribute('data-i'));
			this.parentNode.setAttribute('data-c', current);
			scrollImages(current);
			handleActive();
		});

	}

	eArrowLeftWrap.appendChild(eArrowLeft);
	eArrowRightWrap.appendChild(eArrowRight);
	eViewer.appendChild(eClose);
	eViewer.appendChild(eArrowLeftWrap);
	eViewer.appendChild(eContainer);
	eViewer.appendChild(eArrowRightWrap);
	gallery.appendChild(eViewer);

	eClose.addEventListener('click', handleActive);
	eArrowLeftWrap.addEventListener('click', handleLeft);
	eArrowRightWrap.addEventListener('click', handleRight);
	eContainer.addEventListener('touchmove', handleTouchMove);
	eContainer.addEventListener('touchstart', handleTouchStart);
}

if (!window.erbium) {
	window.erbium = {};
}

if (!window.erbium.gallery) {
	window.erbium.gallery = {};
}

window.erbium.gallery.create = create;
