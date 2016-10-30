(function() {
	'use strict';

	var sStyle = `
		.gallery * {
			transition: all 300ms ease;
		}
		.gallery a {
			display: inline-block;
			text-decoration: none;
		}
		.gallery .viewer {
			display: flex;
			flex-wrap: nowrap;
			align-self: center;
			flex-direction: row;
			align-content: space-around;
			justify-content: space-around;

			top: 0;
			left: 0;
			opacity: 0;
			width: 100vw;
			height: 100vh;
			position: fixed;
			background: rgba(0,0,0,0.6);
			transform: translate3d(100%,0,0);
		}
		.gallery .viewer .container {
			flex: 1 1 auto;
			align-self: center;

			max-width: 85vw;
			max-height: 90vh;
			overflow: hidden;
			white-space: nowrap;
			background: #d3d3d3;
		}
		.gallery .viewer .container > img {
			margin: 0;
			padding: 0;
			width: 100%;
			border: none;
		}
		.gallery .icon {
			cursor: pointer;
			background: rgba(0,0,0,0.1);
		}
		.gallery .icon:hover {
		    background: rgba(0, 0, 0, 0.3);
		}
		.gallery .close {
			top: 1%;
			right: 1%;
		    width: 55px;
		    height: 55px;
			position: absolute;
		}
		.gallery .close:after {
		    content: '';
			top: 7.5px;
			left: 25.5px;
			height: 40px;
		    position: absolute;
		    transform: rotate(45deg);
		    border-left: 5px solid currentColor;
		}
		.gallery .close:before {
		    content: '';
			top: 7.5px;
			left: 25.5px;
			height: 40px;
		    position: absolute;
		    transform: rotate(-45deg);
		    border-left: 5px solid currentColor;
		}
		.gallery .arrow-left, .gallery .arrow-right {
			width: 0;
			margin: auto;
			cursor: pointer;
			border-top: 15px solid transparent;
			border-bottom: 15px solid transparent;
		}
		.gallery .arrow-left {
			border-right: 15px solid currentColor;
		}
		.gallery .arrow-right {
			border-left: 15px solid currentColor;
		}
		.gallery .arrow-left-wrap, .gallery .arrow-right-wrap {
			padding: 15px 20px;
		}
		.gallery .arrow-left-wrap {
			align-self: center;
		}
		.gallery .arrow-right-wrap {
			align-self: center;
		}
		.gallery.active .viewer {
			opacity: 1;
			z-index: 1000;
			transform: translate3d(0,0,0);
		}
	`;

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
		var galleries = document.querySelectorAll('.gallery');

		for (var i = 0, l = galleries.length; i < l; i++) {
			CreateGallery(galleries[i]);
		}
	});

}());
