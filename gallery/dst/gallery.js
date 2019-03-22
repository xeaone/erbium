var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define('Gallery', factory) : factory();
})(this, function () {
	'use strict';

	var sStyle = /*css*/'\n.e-gallery {\n\tcolor: white;\n}\n.e-gallery, .e-gallery div, .e-gallery img, .e-gallery a {\n\ttransition: all 300ms ease;\n}\n.e-gallery img {\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-o-user-select: none;\n\tuser-select: none;\n\tcursor: pointer;\n}\n.e-gallery .e-viewer {\n\tdisplay: -moz-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -moz-flex;\n\tdisplay: flex;\n\n\tflex-wrap: nowrap;\n\t-moz-flex-wrap: nowrap;\n\t-webkit-flex-wrap: nowrap;\n\n\tflex-direction: row;\n\t-moz-flex-direction: row;\n\t-webkit-flex-direction: row;\n\n\t-webkit-align-self: center;\n\talign-self: center;\n\n\talign-content: space-around;\n\t-webkit-align-content: space-around;\n\n\tjustify-content: space-around;\n\t-moz-justify-content: space-around;\n\t-webkit-justify-content: space-around;\n\n\ttop: 0;\n\tleft: 0;\n\topacity: 0;\n\twidth: 100vw;\n\theight: 100vh;\n\tposition: fixed;\n\tbackground: rgba(0,0,0,0.6);\n\ttransform: translate3d(100%,0,0);\n}\n.e-gallery .e-viewer .e-container-wrap {\n\t-webkit-box-flex: 0 1 auto;\n\t-moz-box-flex: 0 1 auto;\n\t-webkit-flex: 0 1 auto;\n\t-moz-flex: 0 1 auto;\n\t-ms-flex: 0 1 auto;\n\tflex: 0 1 auto;\n\n\talign-self: center;\n\t-webkit-align-self: center;\n\n\toverflow: hidden;\n\n\twidth: 85vw;\n\theight: 85vh;\n}\n.e-gallery .e-viewer .e-container {\n\twidth: 100%;\n\theight: 100%;\n\tposition: relative;\n}\n.e-gallery .e-viewer .e-container-wrap .e-container img {\n\ttop: 50%;\n\tleft: 50%;\n\tmargin: 0;\n\tpadding: 0;\n\topacity: 0;\n\tborder: none;\n\tmax-width: none;\n\tborder-radius: 0;\n\tmax-height: none;\n\tbox-shadow: none;\n\tposition: absolute;\n}\n.e-gallery .e-close, .e-gallery .e-arrow-left-wrap, .e-gallery .e-arrow-right-wrap {\n\tcursor: pointer;\n\tbackground: rgba(0,0,0,0.1);\n}\n.e-gallery .e-close:hover, .e-gallery .e-arrow-left-wrap:hover, .e-gallery .e-arrow-right-wrap:hover {\n    background: rgba(0, 0, 0, 0.3);\n}\n.e-gallery .e-close {\n\ttop: 1%;\n\tright: 1%;\n    width: 55px;\n    height: 55px;\n\tposition: absolute;\n}\n.e-gallery .e-close:after {\n    content: \'\';\n\ttop: 7.5px;\n\tleft: 25.5px;\n\theight: 40px;\n    position: absolute;\n    transform: rotate(45deg);\n    border-left: 3px solid currentColor;\n}\n.e-gallery .e-close:before {\n    content: \'\';\n\ttop: 7.5px;\n\tleft: 25.5px;\n\theight: 40px;\n    position: absolute;\n    transform: rotate(-45deg);\n    border-left: 3px solid currentColor;\n}\n.e-gallery .e-arrow-left, .e-gallery .e-arrow-right {\n\twidth: 0;\n\tmargin: auto;\n\tcursor: pointer;\n\tborder-top: 0.7rem solid transparent;\n\tborder-bottom: 0.7rem solid transparent;\n}\n.e-gallery .e-arrow-left {\n\tborder-right: 0.5rem solid currentColor;\n}\n.e-gallery .e-arrow-right {\n\tborder-left: 0.5rem solid currentColor;\n}\n.e-gallery .e-arrow-left-wrap, .e-gallery .e-arrow-right-wrap {\n\tmargin: 0 1vw;\n\tpadding: 1rem;\n}\n.e-gallery .e-arrow-left-wrap {\n\talign-self: center;\n}\n.e-gallery .e-arrow-right-wrap {\n\talign-self: center;\n}\n.e-gallery.active .e-viewer {\n\topacity: 1;\n\tz-index: 1000;\n\ttransform: translate3d(0,0,0);\n}\n.e-gallery .e-spinner {\n\tmargin: auto;\n\twidth: 1.5rem;\n\theight: 1.5rem;\n\tborder: solid calc(1.5rem/5) rgba(0, 0, 0, 0.3);\n\tborder-top: solid calc(1.5rem/5) white;\n\tborder-radius: 50%;\n\n\ttop: 0;\n\tright: 0;\n\tleft: 0;\n\tbottom: 0;\n\tz-index: 1;\n\tdisplay: none;\n\tposition: absolute;\n\n\tanimation: spin 2s linear infinite;\n\t-o-animation: spin 2s linear infinite;\n\t-ms-animation: spin 2s linear infinite;\n\t-moz-animation: spin 2s linear infinite;\n\t-webkit-animation: spin 2s linear infinite;\n}\n@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\n@-o-keyframes spin { 0% { -o-transform: rotate(0deg); } 100% { -o-transform: rotate(360deg); } }\n@-ms-keyframes spin { 0% { -ms-transform: rotate(0deg); } 100% { -ms-transform: rotate(360deg); } }\n@-moz-keyframes spin { 0% { -moz-transform: rotate(0deg); } 100% { -moz-transform: rotate(360deg); } }\n@-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); } }\n';

	/*
 	version: 2.0.0
 	title: erbium gallery
 	author: alexander elias
 */

	var nStyle = document.createTextNode(sStyle);
	var eStyle = document.createElement('style');
	eStyle.appendChild(nStyle);
	document.head.appendChild(eStyle);

	function create(option) {
		option = option || {};

		option.schema = option.schema || { name: 'img', attributes: [{ name: 'src', value: '$images' }] };

		var eClose = document.createElement('div');
		var eViewer = document.createElement('div');
		var eSpinner = document.createElement('div');
		var eContainer = document.createElement('div');
		var eArrowLeft = document.createElement('div');
		var eArrowRight = document.createElement('div');
		var eContainerWrap = document.createElement('div');
		var eArrowLeftWrap = document.createElement('div');
		var eArrowRightWrap = document.createElement('div');

		var eGallery = typeof option.target === 'string' ? document.querySelector(option.target) : option.target;

		var items = [];

		items.push.apply(items, eGallery.children);
		items.push.apply(items, option.images);

		var xDown = null;
		var l = items.length;
		var last = l - 1;

		function getCurrent() {
			return Number(eContainer.getAttribute('data-i'));
		}

		function setCurrent(current) {
			var image = eContainer.children[current];
			var src = image.getAttribute('data-s');

			eSpinner.style.display = 'block';
			image.setAttribute('src', src);
			eContainer.setAttribute('data-i', current);

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

		function scrollImages(current) {
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

		function handleActive() {
			var isAcive = eGallery.classList.toggle('active');
			if (isAcive) document.body.style.overflow = 'hidden';else document.body.style.overflow = 'initial';
		}

		function handleRight() {
			var current = getCurrent();
			if (current < last) current++;
			scrollImages(current);
		}

		function handleLeft() {
			var current = getCurrent();
			if (current > 0) current--;
			scrollImages(current);
		}

		function handleTouchStart(e) {
			xDown = e.touches[0].clientX;
		}

		function handleTouchMove(e) {
			if (!xDown) return;

			var xUp = e.touches[0].clientX;
			var xDiff = xDown - xUp;

			// bind e-arrow-left-wrap and e-arrow-right-wrap
			if (xDiff > 0) handleRight.call(this.previousElementSibling);else handleLeft.call(this.nextElementSibling);

			xDown = null;
		}

		function parse(data, index) {
			var node = document.createElement(data.name);

			// var variables = option.variables;
			var attributes = data.attributes;

			if (attributes) {
				for (var i = 0, l = attributes.length; i < l; i++) {
					var attribute = attributes[i],
					    value;

					if ('value' in attribute) {
						if (attribute.value.indexOf('$') === 0) {
							var property = attribute.value.slice(1);
							if (property in option) {
								var variable = option[property];
								value = Array.isArray(variable) ? variable[index] : variable;
							} else {
								value = undefined;
							}
						} else {
							value = attribute.value;
						}
					} else {
						value = '';
					}

					node.setAttribute(attribute.name, value);
				}
			}

			if (node.nodeName === 'IMG' && option.alt !== false && node.hasAttribute('src') && !node.hasAttribute('alt')) {
				var alt = node.src.split('/').pop().replace(/(-)|(_)|(\.\w+)/g, ' ');
				node.setAttribute('alt', alt);
			}

			var children = data.children;
			if (children) {
				for (var i = 0; i < children.length; i++) {
					node.appendChild(parse(children[i], index));
				}
			}

			return node;
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

			var galleryChild = items[i].constructor === String || items[i].constructor === Object ? parse(option.schema, i) : items[i];

			var containerChild = galleryChild.nodeName === 'IMG' ? galleryChild.cloneNode(true) : galleryChild.querySelector('img').cloneNode(true);
			containerChild.setAttribute('data-s', containerChild.src);
			containerChild.removeAttribute('src');
			eContainer.appendChild(containerChild);

			// if (thumbnailItems) {
			// 	var thumbnaiItem = thumbnailItems[i];
			// 	if (thumbnaiItem) {
			// 		galleryChild = createImage(thumbnaiItem, i).cloneNode(true);
			// 		eGallery.appendChild(galleryChild);
			// 	}

			galleryChild.addEventListener('click', function (index) {
				eContainer.setAttribute('data-i', index);
				scrollImages(index);
				handleActive();
			}.bind(null, i));

			eGallery.appendChild(galleryChild);
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

		eViewer.addEventListener('touchmove', handleTouchMove);
		eViewer.addEventListener('touchstart', handleTouchStart);
	}

	if (!window.erbium) window.erbium = {};
	if (!window.erbium.gallery) window.erbium.gallery = {};

	window.erbium.gallery.create = create;
});