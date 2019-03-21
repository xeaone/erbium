/*
	version: 1.0.3
	title: erbium gallery
	author: alexander elias
*/

import { sStyle } from './ignore/style.js';

var nStyle = document.createTextNode(sStyle);
var eStyle = document.createElement('style');
eStyle.appendChild(nStyle);
document.head.appendChild(eStyle);

// function create (eGallery, defaultItems, thumbnailItems) {
function create (options) {
	var eGallery = options.target;
	var defaultItems = options.links;
	var thumbnailItems = options.thumbnails;

	var eClose = document.createElement('div');
	var eViewer = document.createElement('div');
	var eSpinner = document.createElement('div');
	var eContainer = document.createElement('div');
	var eArrowLeft = document.createElement('div');
	var eArrowRight = document.createElement('div');
	var eContainerWrap = document.createElement('div');
	var eArrowLeftWrap = document.createElement('div');
	var eArrowRightWrap = document.createElement('div');

	eGallery = typeof eGallery === 'string' ? document.querySelector(eGallery) : eGallery;
	defaultItems = defaultItems || [];

	defaultItems.push.apply(defaultItems, eGallery.children);

	var xDown = null;
	var l = defaultItems.length;
	var last = l-1;
	// var isGalleryChildless = eGallery.children.length === 0;

	function createImage (data) {
	}

	function getData (data, index) {
		var result = {};

		switch (data.constructor.name) {
			case 'String': {
				result.src = data;
				result['data-i'] = index;
				result.alt = data.split('/').pop().replace(/(-)|(_)|(\.\w+)/g, ' ');
			}
				break;
			case 'Object': {
				result.alt = data.alt;
				result.src = data.src;
				result['data-i'] = index;
			}
				break;
			default:
				var image = data.nodeName === 'IMG' ? data : data.querySelector('img');
				result.src = image.src;
				result.alt = image.alt;
				result['data-i'] = index;
		}

		return result;
	}

	function getCurrent () {
		return Number(eContainer.getAttribute('data-c'));
	}

	function setCurrent (current) {
		var image = eContainer.children[current];
		var src = image.getAttribute('data-s');

		eSpinner.style.display = 'block';
		image.setAttribute('src', src);
		eContainer.setAttribute('data-c', current);

		image.addEventListener('load', function () {
			eSpinner.style.display = 'none';
			this.style.opacity = '1';
			this.style.maxWidth = this.naturalWidth + 'px';
			this.style.maxHeight = this.naturalHeight + 'px';
			this.removeEventListener('load', null);
			if (this.naturalWidth >= this.naturalHeight) {
				this.style.width = '100%';
			} else {
				this.style.height = '100%';
			}
		});
	}

	function scrollImages (current) {
		setCurrent(current);

		for (var i = 0, l = eContainer.children.length; i < l; i++) {
			var image = eContainer.children[i];
			var direction = i < current ? '-' : '+';
			if (i === current) {
				image.style.transform = 'translate(-50%,-50%)';
			} else {
				image.style.opacity = '0';
				image.style.transform = 'translate(' + direction + '100%,-50%)';
			}
		}
	}

	function handleActive () {
		var isAcive = eGallery.classList.toggle('active');
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
		if (current > 0) current--;
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

	eClose.classList.add('e-close');
	eViewer.classList.add('e-viewer');
	eSpinner.classList.add('e-spinner');
	eGallery.classList.add('e-gallery');
	eContainer.classList.add('e-container');
	eArrowLeft.classList.add('e-arrow-left');
	eArrowRight.classList.add('e-arrow-right');
	eContainerWrap.classList.add('e-container-wrap');
	eArrowLeftWrap.classList.add('e-arrow-left-wrap');
	eArrowRightWrap.classList.add('e-arrow-right-wrap');

	for (var i = 0; i < l; i++) {
		var defaultItem = defaultItems[i];
		var galleryChild = null;
		var data = getData(defaultItem, i);

		// var viewerImage = createImage(defaultItem, i).cloneNode(true);
		viewerImage.setAttribute('data-s', viewerImage.src);
		viewerImage.removeAttribute('src');
		eContainer.appendChild(viewerImage);

		if (thumbnailItems) {
			var thumbnaiItem = thumbnailItems[i];
			if (thumbnaiItem) {
				galleryChild = createImage(thumbnaiItem, i).cloneNode(true);
				eGallery.appendChild(galleryChild);
			}
		} else {
			galleryChild = defaultItem.constructor === Object ||defaultItem.constructor === String ? viewerImage : defaultItem;
			// galleryImage = defaultItem;
			// src = galleryImage.getAttribute('data-s');
			// galleryImage.setAttribute('src', src);
			eGallery.appendChild(galleryChild);
		}

		galleryChild.addEventListener('click', function () {
			var current = Number(this.getAttribute('data-i'));
			eContainer.setAttribute('data-c', current);
			scrollImages(current);
			handleActive();
		});
	}

	eArrowLeftWrap.appendChild(eArrowLeft);
	eArrowRightWrap.appendChild(eArrowRight);
	eContainerWrap.appendChild(eContainer);
	eViewer.appendChild(eClose);
	eViewer.appendChild(eSpinner);
	eViewer.appendChild(eArrowLeftWrap);
	eViewer.appendChild(eContainerWrap);
	eViewer.appendChild(eArrowRightWrap);
	eGallery.appendChild(eViewer);

	eClose.addEventListener('click', handleActive);
	eArrowLeftWrap.addEventListener('click', handleLeft);
	eArrowRightWrap.addEventListener('click', handleRight);
	eContainerWrap.addEventListener('touchmove', handleTouchMove);
	eContainerWrap.addEventListener('touchstart', handleTouchStart);
}

if (!window.erbium) window.erbium = {};
if (!window.erbium.gallery) window.erbium.gallery = {};

window.erbium.gallery.create = create;
