/*
	version: 2.0.0
	title: erbium gallery
	author: alexander elias
*/

import sStyle from './style.js';

var nStyle = document.createTextNode(sStyle);
var eStyle = document.createElement('style');
eStyle.appendChild(nStyle);
document.head.appendChild(eStyle);

function create (option) {
	option = option || {};

	option.schema = option.schema || { name: 'img', attributes: [ { name: 'src', value: '$images' }] };

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
	var last = l-1;

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
		return Number(eContainer.getAttribute('data-i'));
	}

	function setCurrent (current) {
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

	function parse (data, index) {
		var node = document.createElement(data.name);

		// var variables = option.variables;
		var attributes = data.attributes;

		if (attributes) {
			for (var i = 0, l = attributes.length; i < l; i++) {
				var attribute = attributes[i], value, name;

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

		var galleryChild =
			items[i].constructor === String ||
			items[i].constructor === Object ?
			parse(option.schema, i) :
			items[i];

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
