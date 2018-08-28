/*
	version: 1.0.0
	title: erbium overlay
	author: alexander elias
*/

import sStyle from './overlay.i.js';

var nStyle = document.createTextNode(sStyle);
var eStyle = document.createElement('style');

eStyle.appendChild(nStyle);
document.head.appendChild(eStyle);

var elements = document.querySelectorAll('.e-overlay');

for (var i = 0, l = elements.length; i < l; i++) {

	var container = elements[i];
	var wrap = container.querySelector('.e-overlay-wrap');
	var open = container.querySelector('.e-overlay-open');
	var close = container.querySelector('.e-overlay-close');
	var content = container.querySelector('.e-overlay-content');

	if (!wrap) throw new Error('e-overlay-wrap class required');
	// if (!open) throw new Error('e-overlay-open class required');
	// if (!close) throw new Error('e-overlay-close class required');

	if (!open) {
		open = document.createElement('div');
		var openBarOne = document.createElement('div');
		var openBarTwo = document.createElement('div');
		open.classList.add('e-overlay-open');
		openBarOne.classList.add('e-overlay-open-icon');
		openBarTwo.classList.add('e-overlay-open-icon');
		open.appendChild(openBarOne);
		open.appendChild(openBarTwo);
		container.appendChild(open);
	}

	if (!close) {
		close = document.createElement('div');
		var closeBarOne = document.createElement('div');
		var closeBarTwo = document.createElement('div');
		close.classList.add('e-overlay-close');
		closeBarOne.classList.add('e-overlay-close-icon');
		closeBarTwo.classList.add('e-overlay-close-icon');
		close.appendChild(closeBarOne);
		close.appendChild(closeBarTwo);
		container.appendChild(close);
	}

	open.addEventListener('click', function (open, close, wrap, content) {
		wrap.classList.add('active');
	}.bind(null, open, close, wrap, content));

	close.addEventListener('click', function (open, close, wrap, content) {
		wrap.classList.remove('active');
	}.bind(null, open, close, wrap, content));

}

// var eClose = document.createElement('div');
// var eViewer = document.createElement('div');
// var eSpinner = document.createElement('div');
// var eContainer = document.createElement('div');
// var eArrowLeft = document.createElement('div');
// var eArrowRight = document.createElement('div');
// var eContainerWrap = document.createElement('div');
// var eArrowLeftWrap = document.createElement('div');
// var eArrowRightWrap = document.createElement('div');
//
// eGallery = typeof eGallery === 'string' ? document.querySelector(eGallery) : eGallery;
// defaultItems = defaultItems || eGallery.children;
//
// var xDown = null;
// var l = defaultItems.length;
// var last = l-1;
// var isGalleryChildless = eGallery.children.length === 0;
//
// function createImage (item, index) {
// 	var alt = null;
// 	var image = null;
//
// 	switch (item.constructor.name) {
// 		case 'String': {
// 			image = document.createElement('img');
// 			alt = item.split('/').pop().replace(/(-)|(_)|(\.\w+)/g, ' ');
// 			image.setAttribute('alt', alt);
// 			image.setAttribute('src', item);
// 			image.setAttribute('data-i', index);
// 		}
// 			break;
// 		case 'Object': {
// 			image = document.createElement('img');
// 			image.setAttribute('alt', item.alt);
// 			image.setAttribute('src', item.src);
// 			image.setAttribute('data-i', index);
// 		}
// 			break;
// 		case 'HTMLImageElement': {
// 			item.setAttribute('data-i', index);
// 			image = item.cloneNode();
// 		}
// 			break;
// 	}
//
// 	return image;
// }
//
// function getCurrent () {
// 	return Number(eContainer.getAttribute('data-c'));
// }
//
// function setCurrent (current) {
// 	var image = eContainer.children[current];
// 	var src = image.getAttribute('data-s');
//
// 	eSpinner.style.display = 'block';
// 	image.setAttribute('src', src);
// 	eContainer.setAttribute('data-c', current);
//
// 	image.addEventListener('load', function () {
// 		eSpinner.style.display = 'none';
// 		this.style.opacity = '1';
// 		this.style.maxWidth = this.naturalWidth + 'px';
// 		this.style.maxHeight = this.naturalHeight + 'px';
// 		this.removeEventListener('load', null);
// 		if (this.naturalWidth >= this.naturalHeight) {
// 			this.style.width = '100%';
// 		} else {
// 			this.style.height = '100%';
// 		}
// 	});
// }
//
// function scrollImages (current) {
// 	setCurrent(current);
//
// 	for (var i = 0, l = eContainer.children.length; i < l; i++) {
// 		var image = eContainer.children[i];
// 		var direction = i < current ? '-' : '+';
// 		if (i === current) {
// 			image.style.transform = 'translate(-50%,-50%)';
// 		} else {
// 			image.style.opacity = '0';
// 			image.style.transform = 'translate(' + direction + '100%,-50%)';
// 		}
// 	}
// }
//
// function handleActive () {
// 	var isAcive = eGallery.classList.toggle('active');
// 	if (isAcive) document.body.style.overflow = 'hidden';
// 	else document.body.style.overflow = 'initial';
// }
//
// function handleRight () {
// 	var current = getCurrent();
// 	if (current < last) current++;
// 	scrollImages(current);
// }
//
// function handleLeft () {
// 	var current = getCurrent();
// 	if (current > 0) current--;
// 	scrollImages(current);
// }
//
// function handleTouchStart (e) {
// 	xDown = e.touches[0].clientX;
// }
//
// function handleTouchMove (e) {
// 	if (!xDown) return;
//
// 	var xUp = e.touches[0].clientX;
// 	var xDiff = xDown - xUp;
//
// 	// bind e-arrow-left-wrap and e-arrow-right-wrap
// 	if (xDiff > 0) handleRight.call(this.previousElementSibling);
// 	else handleLeft.call(this.nextElementSibling);
//
// 	xDown = null;
// }
//
// eClose.classList.add('e-close');
// eViewer.classList.add('e-viewer');
// eSpinner.classList.add('e-spinner');
// eGallery.classList.add('e-gallery');
// eContainer.classList.add('e-container');
// eArrowLeft.classList.add('e-arrow-left');
// eArrowRight.classList.add('e-arrow-right');
// eContainerWrap.classList.add('e-container-wrap');
// eArrowLeftWrap.classList.add('e-arrow-left-wrap');
// eArrowRightWrap.classList.add('e-arrow-right-wrap');
//
// for (var i = 0; i < l; i++) {
// 	var defaultItem = defaultItems[i];
// 	var clickableImage = defaultItem;
// 	var galleryImage = null;
// 	var src = null;
//
// 	var viewerImage = createImage(defaultItem, i);
// 	viewerImage.setAttribute('data-s', viewerImage.src);
// 	viewerImage.removeAttribute('src');
// 	eContainer.appendChild(viewerImage);
//
// 	if (thumbnailItems) {
// 		var thumbnaiItem = thumbnailItems[i];
// 		if (thumbnaiItem) {
// 			galleryImage = createImage(thumbnaiItem, i);
// 			eGallery.appendChild(galleryImage);
// 			clickableImage = galleryImage;
// 		}
// 	} else if (!thumbnailItems && isGalleryChildless) {
// 		galleryImage = viewerImage.cloneNode();
// 		src = galleryImage.getAttribute('data-s');
// 		galleryImage.setAttribute('src', src);
// 		eGallery.appendChild(galleryImage);
// 		clickableImage = galleryImage;
// 	}
//
// 	clickableImage.addEventListener('click', function () {
// 		var current = Number(this.getAttribute('data-i'));
// 		eContainer.setAttribute('data-c', current);
// 		scrollImages(current);
// 		handleActive();
// 	});
// }
//
// eArrowLeftWrap.appendChild(eArrowLeft);
// eArrowRightWrap.appendChild(eArrowRight);
// eContainerWrap.appendChild(eContainer);
// eViewer.appendChild(eClose);
// eViewer.appendChild(eSpinner);
// eViewer.appendChild(eArrowLeftWrap);
// eViewer.appendChild(eContainerWrap);
// eViewer.appendChild(eArrowRightWrap);
// eGallery.appendChild(eViewer);
//
// eClose.addEventListener('click', handleActive);
// eArrowLeftWrap.addEventListener('click', handleLeft);
// eArrowRightWrap.addEventListener('click', handleRight);
// eContainerWrap.addEventListener('touchmove', handleTouchMove);
// eContainerWrap.addEventListener('touchstart', handleTouchStart);
