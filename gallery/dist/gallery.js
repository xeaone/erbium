(function () {
	'use strict';

	var sStyle = `
.e-gallery {
	color: white;
}
.e-gallery, .e-gallery div, .e-gallery img, .e-gallery a {
	transition: all 300ms ease;
}
.e-gallery img {
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-o-user-select: none;
	user-select: none;
	cursor: pointer;
}
.e-gallery .e-viewer {
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-flex;
	display: flex;

	flex-wrap: nowrap;
	-moz-flex-wrap: nowrap;
	-webkit-flex-wrap: nowrap;

	flex-direction: row;
	-moz-flex-direction: row;
	-webkit-flex-direction: row;

	-webkit-align-self: center;
	align-self: center;

	align-content: space-around;
	-webkit-align-content: space-around;

	justify-content: space-around;
	-moz-justify-content: space-around;
	-webkit-justify-content: space-around;

	top: 0;
	left: 0;
	opacity: 0;
	width: 100vw;
	height: 100vh;
	position: fixed;
	background: rgba(0,0,0,0.6);
	transform: translate3d(100%,0,0);
}
.e-gallery .e-viewer .e-container-wrap {
	-webkit-box-flex: 0 1 auto;
	-moz-box-flex: 0 1 auto;
	-webkit-flex: 0 1 auto;
	-moz-flex: 0 1 auto;
	-ms-flex: 0 1 auto;
	flex: 0 1 auto;

	align-self: center;
	-webkit-align-self: center;

	overflow: hidden;

	width: 85vw;
	height: 85vh;
}
.e-gallery .e-viewer .e-container {
	width: 100%;
	height: 100%;
	position: relative;
}
.e-gallery .e-viewer .e-container-wrap .e-container img {
	top: 50%;
	left: 50%;
	margin: 0;
	padding: 0;
	opacity: 0;
	border: none;
	max-width: none;
	border-radius: 0;
	max-height: none;
	box-shadow: none;
	position: absolute;
}
.e-gallery .e-close, .e-gallery .e-arrow-left-wrap, .e-gallery .e-arrow-right-wrap {
	cursor: pointer;
	background: rgba(0,0,0,0.1);
}
.e-gallery .e-close:hover, .e-gallery .e-arrow-left-wrap:hover, .e-gallery .e-arrow-right-wrap:hover {
    background: rgba(0, 0, 0, 0.3);
}
.e-gallery .e-close {
	top: 1%;
	right: 1%;
    width: 55px;
    height: 55px;
	position: absolute;
}
.e-gallery .e-close:after {
    content: '';
	top: 7.5px;
	left: 25.5px;
	height: 40px;
    position: absolute;
    transform: rotate(45deg);
    border-left: 5px solid currentColor;
}
.e-gallery .e-close:before {
    content: '';
	top: 7.5px;
	left: 25.5px;
	height: 40px;
    position: absolute;
    transform: rotate(-45deg);
    border-left: 5px solid currentColor;
}
.e-gallery .e-arrow-left, .e-gallery .e-arrow-right {
	width: 0;
	margin: auto;
	cursor: pointer;
	border-top: 15px solid transparent;
	border-bottom: 15px solid transparent;
}
.e-gallery .e-arrow-left {
	border-right: 15px solid currentColor;
}
.e-gallery .e-arrow-right {
	border-left: 15px solid currentColor;
}
.e-gallery .e-arrow-left-wrap, .e-gallery .e-arrow-right-wrap {
	margin: 1%;
	padding: 15px 20px;
}
.e-gallery .e-arrow-left-wrap {
	align-self: center;
}
.e-gallery .e-arrow-right-wrap {
	align-self: center;
}
.e-gallery.active .e-viewer {
	opacity: 1;
	z-index: 1000;
	transform: translate3d(0,0,0);
}
.e-gallery .e-spinner {
	margin: auto;
	width: 1.5rem;
	height: 1.5rem;
	border: solid calc(1.5rem/5) rgba(0, 0, 0, 0.3);
	border-top: solid calc(1.5rem/5) white;
	border-radius: 50%;

	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 1;
	display: none;
	position: absolute;

	animation: spin 2s linear infinite;
	-o-animation: spin 2s linear infinite;
	-ms-animation: spin 2s linear infinite;
	-moz-animation: spin 2s linear infinite;
	-webkit-animation: spin 2s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@-o-keyframes spin { 0% { -o-transform: rotate(0deg); } 100% { -o-transform: rotate(360deg); } }
@-ms-keyframes spin { 0% { -ms-transform: rotate(0deg); } 100% { -ms-transform: rotate(360deg); } }
@-moz-keyframes spin { 0% { -moz-transform: rotate(0deg); } 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); } }
`;

	/*
		version: 1.0.3
		title: erbium gallery
		author: alexander elias
	*/

	var nStyle = document.createTextNode(sStyle);
	var eStyle = document.createElement('style');
	eStyle.appendChild(nStyle);
	document.head.appendChild(eStyle);

	function create (eGallery, defaultItems, thumbnailItems) {
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
		defaultItems = defaultItems || eGallery.children;

		var xDown = null;
		var l = defaultItems.length;
		var last = l-1;
		var isGalleryChildless = eGallery.children.length === 0;

		function createImage (item, index) {
			var alt = null;
			var image = null;

			switch (item.constructor.name) {
				case 'String': {
					image = document.createElement('img');
					alt = item.split('/').pop().replace(/(-)|(_)|(\.\w+)/g, ' ');
					image.setAttribute('alt', alt);
					image.setAttribute('src', item);
					image.setAttribute('data-i', index);
				}
					break;
				case 'Object': {
					image = document.createElement('img');
					image.setAttribute('alt', item.alt);
					image.setAttribute('src', item.src);
					image.setAttribute('data-i', index);
				}
					break;
				case 'HTMLImageElement': {
					item.setAttribute('data-i', index);
					image = item.cloneNode();
				}
					break;
			}

			return image;
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
			var clickableImage = defaultItem;
			var galleryImage = null;
			var src = null;

			var viewerImage = createImage(defaultItem, i);
			viewerImage.setAttribute('data-s', viewerImage.src);
			viewerImage.removeAttribute('src');
			eContainer.appendChild(viewerImage);

			if (thumbnailItems) {
				var thumbnaiItem = thumbnailItems[i];
				if (thumbnaiItem) {
					galleryImage = createImage(thumbnaiItem, i);
					eGallery.appendChild(galleryImage);
					clickableImage = galleryImage;
				}
			} else if (!thumbnailItems && isGalleryChildless) {
				galleryImage = viewerImage.cloneNode();
				src = galleryImage.getAttribute('data-s');
				galleryImage.setAttribute('src', src);
				eGallery.appendChild(galleryImage);
				clickableImage = galleryImage;
			}

			clickableImage.addEventListener('click', function () {
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

}());