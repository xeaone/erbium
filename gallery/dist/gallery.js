(function () {
	'use strict';

	var sStyle = `
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
	display: inline-block;
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
.e-gallery .e-viewer .e-container {
	-webkit-box-flex: 1 1 auto;
	-moz-box-flex: 1 1 auto;
	-webkit-flex: 1 1 auto;
	-moz-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;

	align-self: center;
	-webkit-align-self: center;

	max-width: 85vw;
	max-height: 90vh;
	background: #000;
	overflow: hidden;
	white-space: nowrap;
	text-align: center;
}
.e-gallery .e-viewer .e-container > img {
	margin: 0;
	padding: 0;
	width: 100%;
	border: none;
	box-shadow: none;
	pointer-events: none;
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
`;

	/*
		version: 1.0.1
		title: erbium gallery
		author: alexander elias
	*/

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

}());