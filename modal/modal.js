(function() {
	'use strict';

	var sStyle = `
	.modal *  {
		font-size: 1em;
		font-family: sans-serif;
		-webkit-transition: all 300ms ease;
		transition: all 300ms ease;
	}
	.modal {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0,0,0,0);

		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;

		-webkit-transition: background 600ms ease;
		transition: background 600ms ease;
	}
	.modal .box {
		padding: 16px;
		margin: auto;
		background: #FFF;
		box-shadow: 0px 3px 3px rgba(0,0,0,0.1);

		-ms-flex: 0 1 300px;
		-webkit-box-flex: 0 1 300px;
		flex: 0 1 300px;

		-ms-grid-row-align: center;
		-ms-flex-item-align: center;
	    align-self: center;

		-webkit-transform: translate3d(0, -500%, 0);
	    transform: translate3d(0, -500%, 0);
	}
	.modal .title {
		margin: auto;
		padding: 4px;
		max-width: 95%;
		font-size: 2em;
		border-bottom: solid 1px rgba(0,0,0,0.2);
	}
	.modal .description {
		padding: 4px;
		margin: auto;
		max-width: 95%;
	}
	.modal .content {
		padding: 8px;
		display: block;
	}
	.modal.active {
		z-index: 1000;
		background: rgba(0,0,0,0.6);
	}
	.modal.active .box {
		-webkit-transform: translate3d(0,0,0);
		transform: translate3d(0,0,0);
	}
	.e-x {
		float: right;
		width: 1.5em;
		height: 1.5em;
	}
	.e-x {
		min-width: 1em;
		min-height: 1em;
		cursor: pointer;
		position: relative;
		display: inline-block;
	}
	.e-x:before, .e-x:after {
		top: 0%;
		left: calc(50% - 0.125em);
		width: 0.25em;
		height: 100%;
		content: '';
		position: absolute;
		background: currentColor;
		transition: -webkit-transform 300ms ease;
		transition: transform 300ms ease;
	}
	.e-x:before {
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}
	.e-x:after {
		-webkit-transform: rotate(45deg);
	    transform: rotate(45deg);
	}
	.e-x:hover:before {
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}
	.e-x:hover:after {
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}
	`;

	var eStyle = document.createElement('style');
	var nStyle = document.createTextNode(sStyle);
	eStyle.appendChild(nStyle);
	document.head.appendChild(eStyle);

	if (!window.Erbium) window.Erbium = {};

	window.Erbium.modal = {};
	window.Erbium.modal.items = [];

	var setRepeat = function (modal) {
		window.localStorage.setItem(modal.name, modal.repeat);
		window.sessionStorage.setItem(modal.name, modal.repeat);
	};

	var isTogglable = function (modal) {
		var l = window.localStorage.getItem(modal.name);
		var s = window.sessionStorage.getItem(modal.name);
		if (modal.repeat === 'once') return !l;
		if (modal.repeat === 'each') return !s;
		if (!modal.repeat) return true;
	};

	var toggle = function (modal) {
		if (isTogglable(modal)) {
			setRepeat(modal);
			return modal.modal.classList.toggle('active');
		} else {
			return false;
		}
	};

	window.Erbium.modal.create = function (options) {
		var self = {};

		self.repeat = options.repeat;

		self.index = window.Erbium.modal.items.length;
		self.name = 'erbium.modal.' + self.index;

		self.modal = document.createElement('div');
		self.box = document.createElement('div');
		self.close = document.createElement('div');
		self.title = document.createElement('div');
		self.description = document.createElement('div');
		self.content = document.createElement('div');

		self.modal.classList.add('modal');
		self.box.classList.add('box');
		self.close.classList.add('e-x');
		self.title.classList.add('title');
		self.description.classList.add('description');
		self.content.classList.add('content');

		self.modal.appendChild(self.box);
		self.box.appendChild(self.close);
		self.box.appendChild(self.title);
		self.box.appendChild(self.description);
		self.box.appendChild(self.content);

		self.close.addEventListener('click', function () {
			self.modal.classList.remove('active');
		});

		self.toggle = function () {
			return toggle(self);
		};

		if (options.title) {
			self.title.innerText = options.title;
		}

		if (options.description) {
			self.description.innerText = options.description;
		}

		if (options.content) {
			if (options.content.constructor.name === 'String') self.content.innerHTML = options.content;
			else self.content.appendChild(options.content);
		}

		if (options.timeout >= 0) {
			setTimeout(function () {
				toggle(self);
			}, options.timeout);
		}

		if (options.interval >= 0) {
			setInterval(function () {
				toggle(self);
			}, options.interval);
		}

		window.Erbium.modal.items.push(self);

		return self;
	};

	window.addEventListener('load', function () {
		window.Erbium.modal.items.forEach(function (item) {
			document.body.appendChild(item.modal);
		});
	});

}());
