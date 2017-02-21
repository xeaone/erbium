function mouseMove (e) {
	var x = e.clientX - this.moveable.x;
	var y = e.clientY - this.moveable.y;
	this.style.left = x + 'px';
	this.style.top = y + 'px';
}

function mouseUp () {
	this.removeEventListener('mousemove', mouseMove);
}

function mouseOut () {
	this.removeEventListener('mousemove', mouseMove);
}

function mouseDown (e) {
	this.moveable.x = e.clientX - this.offsetLeft;
	this.moveable.y = e.clientY - this.offsetTop;
	this.addEventListener('mousemove', mouseMove);
}

function listener (element, x, y) {
	element.moveable = { x: x, y: y };
	element.style.position = 'absolute';
	element.style.left = x + 'px';
	element.style.top = y + 'px';
	element.draggable = false;
	element.addEventListener('mouseup', mouseUp);
	element.addEventListener('mouseout', mouseOut);
	element.addEventListener('mousedown', mouseDown);
}

if (!window.Moveable) {
	window.Moveable = {
		listener: listener
	};
}
