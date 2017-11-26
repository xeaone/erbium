/*
	@banner
	title: nav-bar
	version: 1.1.7
	license: MPL-2.0
	author: Alexander Elias
	email: alex.steven.elias@gmail.com
*/
var i, l;

var sStyle = '${sStyle}';

var eStyle = document.createElement('style');
var nStyle = document.createTextNode(sStyle);

var arrowLeft = document.createElement('div');
var arrowRight = document.createElement('div');

var closeA = document.createElement('a');
var closeLi = document.createElement('li');
var closeText = document.createTextNode('Close');

var navTool = document.createElement('div');
var navIcon = document.createElement('div');

/*
	stylesheet
*/
eStyle.appendChild(nStyle);
document.head.appendChild(eStyle);

var navBar = document.querySelector('.nav-bar');
var navListAll = navBar.querySelectorAll('ul');
var navListMain = navListAll[0];
navListMain.setAttribute('class', 'nav-list-main');

/*
	arrows
*/
arrowLeft.setAttribute('class', ' nav-arrow-left');
arrowRight.setAttribute('class', 'nav-arrow-right');

/*
	close
*/
closeA.appendChild(arrowLeft.cloneNode(true));
closeA.appendChild(closeText);
closeLi.appendChild(closeA);

/*
	icon
*/
navIcon.setAttribute('class', 'nav-icon');
navIcon.appendChild(document.createElement('div'));
navIcon.appendChild(document.createElement('div'));
navIcon.appendChild(document.createElement('div'));

navIcon.addEventListener('click', function () {
	navListMain.classList.toggle('active');
	navBar.classList.toggle('active');
});

navTool.appendChild(navIcon);
navTool.setAttribute('class', 'nav-tool');
navBar.insertBefore(navTool, navBar.firstElementChild);

for (i = 1, l = navListAll.length; i < l; i++) {
	var closeLiClone = closeLi.cloneNode(true);

	navListAll[i].insertBefore(closeLiClone, navListAll[i].firstElementChild);
	navListAll[i].setAttribute('class', 'nav-list-sub');

	/*
		close
	*/
	closeLiClone.addEventListener('click', function() {

		this.parentNode.parentNode.classList.toggle('active');

		if (this.parentNode.parentNode.parentNode.className === 'nav-list-sub unactive') {
			this.parentNode.parentNode.parentNode.classList.toggle('unactive');
		}

	});

	/*
		open
	*/
	navListAll[i].previousElementSibling.appendChild(arrowRight.cloneNode(true));
	navListAll[i].previousElementSibling.addEventListener('click', function() {

		this.parentNode.classList.toggle('active');

		if (this.parentNode.parentNode.className === 'nav-list-sub') {
			this.parentNode.parentNode.classList.toggle('unactive');
		}

	});

}
