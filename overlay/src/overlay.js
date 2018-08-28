/*
	version: 1.0.0
	title: erbium overlay
	author: alexander elias
*/

(function () { 'use strict';

	var sStyle = /*css*/`
		.e-overlay {
			z-index: 1;
		}
		.e-overlay-wrap {
			top: 0;
			right: 0;
			opacity: 0;
			width: 100%;
			height: 100%;
			display: flex;
			position: fixed;
			align-items: center;
			pointer-events: none;
			flex-direction: column;
			justify-content: center;
			background-color: rgba(0, 0, 0, 0.3);
		}
		.e-overlay-content {
			max-width: 90vw;
			max-height: 90vh;
		}
		.e-overlay-wrap.active {
			opacity: 1;
			pointer-events: initial;
		}
		.e-overlay-open-icon, .e-overlay-close-icon {
			cursor: pointer;
			min-width: 2.3rem;
			min-height: 2.3rem;
			position: relative;
			margin: 0.3vh 0.3vw;
			display: inline-block;
			background-color: rgba(0, 0, 0, 0);
		}
		.e-overlay-open-icon:hover, .e-overlay-close-icon:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.e-overlay-open-icon:before, .e-overlay-open-icon:after {
			content: '';
			top: 5%;
			left: 47.5%;
			height: 90%;
			position: absolute;
			border-left: 0.09rem solid currentColor;
		}
		.e-overlay-close-icon:before, .e-overlay-close-icon:after {
			content: '';
			left: 50%;
			height: 100%;
			position: absolute;
			border-left: 0.09rem solid currentColor;
		}
		.e-overlay-close-icon {
			top: 0;
			right: 0;
			position: absolute;
		}
		.e-overlay-open-icon:before {
			transform: rotate(0deg);
		}
		.e-overlay-open-icon:after {
			transform: rotate(90deg);
		}
		.e-overlay-close-icon:before {
			transform: rotate(-45deg);
		}
		.e-overlay-close-icon:after {
			transform: rotate(45deg);
		}
	`;

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

		if (!open) {
			open = document.createElement('div');
			var openIcon = document.createElement('div');
			open.classList.add('e-overlay-open');
			openIcon.classList.add('e-overlay-open-icon');
			open.appendChild(openIcon);
			container.appendChild(open);
		}

		if (!close) {
			close = document.createElement('div');
			var closeIcon = document.createElement('div');
			close.classList.add('e-overlay-close');
			closeIcon.classList.add('e-overlay-close-icon');
			close.appendChild(closeIcon);
			wrap.appendChild(close);
		}

		open.addEventListener('click', function (open, close, wrap, content) {
			wrap.classList.add('active');
		}.bind(null, open, close, wrap, content));

		close.addEventListener('click', function (open, close, wrap, content) {
			wrap.classList.remove('active');
		}.bind(null, open, close, wrap, content));

	}

}());
