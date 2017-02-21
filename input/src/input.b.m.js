var counter = document.createElement('span');
counter.setAttribute('class', 'e-counter');
counter.innerText = '0';

function insertAfter (insertElement, element) {
	return element.parentNode.insertBefore(insertElement, element.nextSibling);
}

function getWords (text) {
	return text.match(/(\S+\s+)|(\S+)/g) || [];
}

function maxWordData (text, max) {
	var words = getWords(text);
	var data = {};

	if (words && words.length > max) {
		data.text = words.slice(0, max).join('');
		data.isNew = true;
	} else {
		data.text = text;
		data.isNew = false;
	}

	data.characterCount = data.text.length;
	data.wordCount = getWords(data.text).length;

	return data;
}

if (!window.erbium) {
	window.erbium = {};
}

if (!window.erbium.input) {
	window.erbium.input = {};
}

window.erbium.input.setMaxWords = function (element) {
	var max = element.getAttribute('e-max-words') || element.getAttribute('data-e-max-words');
	var isCounter = element.getAttribute('e-counter') || element.getAttribute('data-e-counter');
	var counterClone = null;

	max = Number(max);

	if (isCounter && isCounter === 'true') {
		counterClone = counter.cloneNode(true);
		counterClone.innerText = '0/' + max;
		insertAfter(counterClone, element);
	}

	element.addEventListener('input', function () {
		var data = maxWordData(this.value, max);

		if (data.isNew) this.value = data.text;
		if (isCounter && isCounter === 'true') counterClone.innerText = data.wordCount + '/' + max;

	});

};

document.addEventListener('DOMContentLoaded', function () {
	var elements = document.querySelectorAll('[e-max-words], [data-e-max-words]');

	for (var i = 0, l = elements.length; i < l; i++) {
		window.erbium.input.setMaxWords(elements[i]);
	}

});
