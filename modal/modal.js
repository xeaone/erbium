(function() {
	'use strict';

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
