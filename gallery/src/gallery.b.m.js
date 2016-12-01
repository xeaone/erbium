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

function create (gallery, urls) {
	var viewer = document.createElement('div');
	var container = document.createElement('div');
	var image = document.createElement('img');
	var closeIcon = document.createElement('div');
	var arrowLeft = document.createElement('div');
	var arrowRight = document.createElement('div');
	var arrowLeftWrap = document.createElement('div');
	var arrowRightWrap = document.createElement('div');

	var xDown = null;
	// var l = gallery.children.length;

	var index = 0;
	var first = 0;
	// var last = l-1;
	var images = [];

	function handleClick (e) {
		if (e.target === viewer) handleActive();
		else if (e.target === closeIcon) handleActive();
	}

	function handleActive () {
		var isAcive = gallery.classList.toggle('active');
		if (isAcive) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'initial';
	}

	function handleRight () {
		if (index < last) index++;
		scrollImages();
	}

	function handleLeft () {
		if (index > first) index--;
		scrollImages();
	}

	function scrollImages () {
		var x = index * 100;

		images.forEach(function (item) {
			item.style.transform = 'translate3d(-' + x + '%,0,0)';
		});
	}

	function handleTouchStart (e) {
		xDown = e.touches[0].clientX;
	}

	function handleTouchMove (e) {
		if (!xDown) return;

		var xUp = e.touches[0].clientX;

		var xDiff = xDown - xUp;

		if (xDiff > 0) handleRight();
		else handleLeft();

		xDown = null;
	}

	gallery.classList.add('e-gallery');

	viewer.className = 'viewer';
	container.className = 'container';
	closeIcon.className = 'close icon';
	arrowLeft.className = 'arrow-left';
	arrowRight.className = 'arrow-right';
	arrowLeftWrap.className = 'arrow-left-wrap icon';
	arrowRightWrap.className = 'arrow-right-wrap icon';

	for (var i = 0, l = urls.length; i < l; i++) {
		var imageClone = image.cloneNode();
		var url = urls[i];

		var alt = url.split('/').pop().replace(/(-)|(\.)/g, ' ');

		imageClone.setAttribute('data-i', i);
		imageClone.setAttribute('alt', url);
		imageClone.setAttribute('src', url);

		images.push(imageClone);

		anchorChild.addEventListener('click', function (e) {
			e.preventDefault();

			index = Number(e.target.parentNode.getAttribute('data-i'));

			scrollImages();
			handleActive();
		});

		container.appendChild(imageClone);
	}

	// for (var i = 0; i < l; i++) {
	// 	var anchorChild = gallery.children[i];
	// 	var imageChild = anchorChild.children[0];
	//
	// 	var imageClone = image.cloneNode();
	//
	// 	anchorChild.setAttribute('data-i', i);
	// 	imageClone.setAttribute('alt', imageChild.src);
	// 	imageClone.setAttribute('src', anchorChild.href);
	//
	// 	images.push(imageClone);
	//
	// 	anchorChild.addEventListener('click', function (e) {
	// 		e.preventDefault();
	//
	// 		index = Number(e.target.parentNode.getAttribute('data-i'));
	//
	// 		scrollImages();
	// 		handleActive();
	// 	});
	//
	// 	container.appendChild(imageClone);
	// }

	viewer.addEventListener('click', handleClick);

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
}

if (!window.erbium) {
	window.erbium = {};
}

if (!window.erbium.gallery) {
	window.erbium.gallery = {};
}

window.erbium.gallery.create = create;
