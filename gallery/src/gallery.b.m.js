/*
	version: 1.0.0
	title: erbium gallery
	author: alexander elias
*/

import { sStyle } from './ignore/style.js';

var nStyle = document.createTextNode(sStyle);
var eStyle = document.createElement('style');
eStyle.appendChild(nStyle);
document.head.appendChild(eStyle);

var CreateGallery = function (gallery) {
	var viewer = document.createElement('div');
	var container = document.createElement('div');
	var image = document.createElement('img');
	var closeIcon = document.createElement('div');
	var arrowLeft = document.createElement('div');
	var arrowRight = document.createElement('div');
	var arrowLeftWrap = document.createElement('div');
	var arrowRightWrap = document.createElement('div');

	var xDown = null;

	var l = gallery.children.length;

	var index = 0;
	var first = 0;
	var last = l-1;
	var images = [];

	var handleActive = function () {
		var isAcive = gallery.classList.toggle('active');
		if (isAcive) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'initial';
	};

	var handleRight = function () {
		if (index < last) index++;
		scrollImages();
	};

	var handleLeft = function () {
		if (index > first) index--;
		scrollImages();
	};

	var scrollImages = function () {
		var x = index * 100;

		images.forEach(function (item) {
			item.style.transform = 'translate3d(-' + x + '%,0,0)';
		});
	};

	var handleTouchStart = function (e) {
		xDown = e.touches[0].clientX;
	};

	var handleTouchMove = function (e) {
		if (!xDown) return;

		var xUp = e.touches[0].clientX;

		var xDiff = xDown - xUp;

		if (xDiff > 0) handleRight();
		else handleLeft();

		xDown = null;
	};

	viewer.className = 'viewer';
	container.className = 'container';
	closeIcon.className = 'close icon';
	arrowLeft.className = 'arrow-left';
	arrowRight.className = 'arrow-right';
	arrowLeftWrap.className = 'arrow-left-wrap icon';
	arrowRightWrap.className = 'arrow-right-wrap icon';

	for (var i = 0; i < l; i++) {
		var anchorChild = gallery.children[i];
		var imageChild = anchorChild.children[0];

		var imageClone = image.cloneNode();

		anchorChild.setAttribute('data-i', i);
		imageClone.setAttribute('alt', imageChild.src);
		imageClone.setAttribute('src', anchorChild.href);

		images.push(imageClone);

		anchorChild.addEventListener('click', function (e) {
			e.preventDefault();

			index = Number(e.target.parentNode.getAttribute('data-i'));

			scrollImages();
			handleActive();
		});

		container.appendChild(imageClone);
	}

	viewer.addEventListener('click', function (e) {
		if (e.target === viewer) handleActive();
		else if (e.target === closeIcon) handleActive();
	});

	arrowLeftWrap.addEventListener('click', handleLeft);
	arrowRightWrap.addEventListener('click', handleRight);
	container.addEventListener('touchmove', handleTouchMove);
	container.addEventListener('touchstart', handleTouchStart);

	arrowLeftWrap.appendChild(arrowLeft);
	arrowRightWrap.appendChild(arrowRight);
	viewer.appendChild(closeIcon);
	viewer.appendChild(arrowLeftWrap);
	viewer.appendChild(container);
	viewer.appendChild(arrowRightWrap);
	gallery.appendChild(viewer);
};

document.addEventListener('DOMContentLoaded', function () {
	var galleries = document.querySelectorAll('.e-gallery');

	for (var i = 0, l = galleries.length; i < l; i++) {
		CreateGallery(galleries[i]);
	}
});
