/*
	@preserve
	title: nav-bar
	version: 1.1.1
	author: alexander elias
*/

var sStyle = '.nav-bar a,.nav-bar li,.nav-list-main{display:inline-block}.nav-bar,.nav-bar ul,.nav-list-sub>li{width:100%}.nav-bar{z-index:1;text-align:left;position:relative}.nav-bar *{margin:0;padding:0;transition:all .3s ease-in-out}.nav-bar a{cursor:pointer;padding:24px 64px;vertical-align:middle;min-width:100%;box-sizing:border-box}.nav-bar ul{min-height:100%;list-style:none;text-align:center}.nav-bar li:active,.nav-bar li:focus,.nav-bar li:hover,.nav-bar li:visited{background:rgba(0,0,0,.1)}.nav-list-sub{left:0;position:absolute;max-height:1000px}.nav-list-sub>li:nth-child(1)>a{width:100%;font-size:.9rem;text-align:left;font-weight:700;text-indent:16px;padding:24px 0;text-transform:uppercase}@media screen and (min-width:940px){.nav-tool{height:0}.nav-icon-menu-wrap{transform:scale3d(1,0,1)}.nav-list-sub{transform:translate3d(0,-50%,0) scale3d(1,0,1)}.nav-list-main>li{position:relative}.nav-list-main>li>.nav-list-sub .nav-list-sub{top:0}.nav-list-main>li>.nav-list-sub>li:nth-child(1){display:none}.nav-list-main li.active>.nav-list-sub{transform:translate3d(0,0,0) scale3d(1,1,1)}.nav-bar .unactive{max-height:0}.nav-bar .unactive>li:not(.active)>a{margin:0!important;height:0!important;padding:0!important;touch-action:none;pointer-events:none}}@media screen and (max-width:940px){.nav-bar li,.nav-bar li>a{display:block}.nav-tool{width:100%;height:60px;padding:5px 0;box-sizing:border-box}.nav-icon-menu-wrap{margin:auto 16px;transform:scale3d(1,1,1)}.nav-bar li>a{padding:24px 0}.nav-list-main{position:absolute;transform:translate3d(0,-50%,0) scale3d(1,0,1)}.nav-list-sub{top:0;transform:translate3d(50%,0,0) scale3d(0,1,1)}.nav-bar li.active>.nav-list-sub,.nav-list-main.active{transform:translate3d(0,0,0) scale3d(1,1,1)}}.nav-icon-arrow-down,.nav-icon-arrow-right{width:0;height:0;display:inline-block;vertical-align:middle;transition-delay:.3s}.nav-icon-arrow-down{margin:5px;border-left:.35rem solid transparent;border-right:.35rem solid transparent;border-bottom:.7rem solid currentColor}.nav-icon-arrow-right{margin:5px calc(-5px + .5rem) 5px 5px;border-top:.25rem solid transparent;border-left:.5rem solid currentColor;border-bottom:.25rem solid transparent}li.active>a+ul>li>a>.nav-icon-arrow-down{transform:rotate(-90deg)}li.active>a>.nav-icon-arrow-right{transform:rotate(90deg)}.nav-icon-menu-wrap{height:50px;width:50px;cursor:pointer;position:relative;display:block}.nav-icon-menu{width:100%;height:15%;position:absolute;transform-origin:0 0 0;background:currentColor}.nav-icon-menu:nth-child(1){top:10%}.nav-icon-menu:nth-child(2){top:42.5%}.nav-icon-menu:nth-child(3){top:75%}.nav-bar.active .nav-icon-menu:nth-child(1){height:13%;transform:rotate(45deg) translate3d(13%,-112%,0)}.nav-bar.active .nav-icon-menu:nth-child(2){transform:rotate(45deg) translate3d(-10%,-250%,0)}.nav-bar.active .nav-icon-menu:nth-child(3){transform:rotate(-45deg) translate3d(3%,67%,0)}';

var eStyle = document.createElement('style');
var nStyle = document.createTextNode(sStyle);

var arrowDown = document.createElement('div');
var arrowRight = document.createElement('div');

var closeA = document.createElement('a');
var closeLi = document.createElement('li');
var closeText = document.createTextNode('Close');

var navTool = document.createElement('div');
var navIconWrap = document.createElement('div');
var navIcon = document.createElement('div');

document.addEventListener('DOMContentLoaded', function () {

	/*
		add stylesheet
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
	arrowDown.setAttribute('class', ' nav-icon-arrow-down');
	arrowRight.setAttribute('class', 'nav-icon-arrow-right');

	/*
		close
	*/
	closeA.appendChild(arrowDown.cloneNode(true));
	closeA.appendChild(closeText);
	closeLi.appendChild(closeA);

	/*
		icon
	*/
	navTool.setAttribute('class', 'nav-tool');
	navIconWrap.setAttribute('class', 'nav-icon-menu-wrap');
	navIcon.setAttribute('class', 'nav-icon-menu');

	for (var c = 0; c < 3; c++) navIconWrap.appendChild(navIcon.cloneNode(true));

	navIconWrap.addEventListener('click', function () {
		navListMain.classList.toggle('active');
		navBar.classList.toggle('active');
	});

	navTool.appendChild(navIconWrap);
	navBar.insertBefore(navTool, navBar.firstElementChild);

	for (var i = 1, l = navListAll.length; i < l; i++) {
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

});
