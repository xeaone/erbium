(function() {
	'use strict';

	var sStyle = `
	.nav-bar {
		width: 100%;
		position: relative;
	}
	.nav-bar * {
		margin: 0;
		padding: 0;
		transition: all 300ms ease-in-out;
	}
	.nav-bar a {
		padding: 24px 64px;
		display: inline-block;
		vertical-align: middle;
	}
	.nav-bar ul {
		width: 100%;
		min-height: 100%;
		list-style: none;
		text-align: center;
	}
	.nav-bar li {
		display: inline-block;
	}
	.nav-bar li:hover, .nav-bar li:focus, .nav-bar li:active, .nav-bar li:visited {
		background: rgba(0,0,0,0.1);
	}
	.nav-list-main {
		display: inline-block;
	}
	.nav-list-sub {
		left: 0px;
	    position: absolute;
		max-height: 1000px; /* unactive transition*/
	}
	.nav-list-sub > li {
		width: 100%;
	}
	.nav-list-sub > li:nth-child(1) > a {
		width: 100%;
		font-size: 0.9em;
		text-align: left;
		font-weight: bold;
		text-indent: 16px;
		padding: 24px 0px;
		text-transform: uppercase;
	}
	@media screen and (min-width: 940px) {
		.nav-tool {
			height: 0px;
		}
		.nav-icon-menu-wrap  {
			transform: scale3d(1,0,1);
		}
		.nav-list-sub {
			transform: translate3d(0%,-50%,0) scale3d(1,0,1);
		}
		.nav-list-main > li {
			position: relative;
		}
		.nav-list-main > li > .nav-list-sub .nav-list-sub {
			top: 0px;
		}
		.nav-list-main > li > .nav-list-sub > li:nth-child(1) {
			display: none;
		}
		.nav-list-main li.active > .nav-list-sub {
			transform: translate3d(0%,0%,0) scale3d(1,1,1);
		}
		.nav-bar .unactive {
			max-height: 0px;
		}
		.nav-bar .unactive > li:not(.active) > a {
			margin:0%;
			height: 0%;
			padding: 0%;
		}
	}
	@media screen and (max-width: 940px) {
		.nav-tool {
			width: 100%;
			height: 50px;
			padding: 16px 0px;
		}
		.nav-icon-menu-wrap {
			margin: auto 16px;
			transform: scale3d(1,1,1);
		}
		.nav-bar li {
			display: block;
		}
		.nav-bar li > a {
			display: block;
			padding: 24px 0px;
		}
		.nav-list-main {
			position: absolute;
			transform: translate3d(0%,-50%,0) scale3d(1,0,1);
		}
		.nav-list-sub {
			top: 0px;
			transform: translate3d(50%,0%,0) scale3d(0,1,1);
		}
		.nav-bar li.active > .nav-list-sub, .nav-list-main.active {
			transform: translate3d(0%,0%,0) scale3d(1,1,1);
		}
	}
	.nav-icon-arrow-down {
		width: 0;
		height: 0;
		margin: 5px;
		display: inline-block;
		vertical-align: middle;
		transition-delay: 300ms;
		border-left: 0.35em solid transparent;
		border-right: 0.35em solid transparent;
		border-bottom: 0.7em solid currentColor;
	}
	.nav-icon-arrow-right {
		width: 0;
		height: 0;
		margin: 5px calc(-5px + 0.5em) 5px 5px;
		display: inline-block;
		vertical-align: middle;
		transition-delay: 300ms;
		border-top: 0.25em solid transparent;
		border-left: 0.5em solid currentColor;
		border-bottom: 0.25em solid transparent;
	}
	li.active > a+ul > li > a > .nav-icon-arrow-down {
		transform: rotate(-90deg);
	}
	li.active > a > .nav-icon-arrow-right {
		transform: rotate(90deg);
	}
	.nav-icon-menu-wrap  {
		height: 50px;
		width: 50px;
		cursor: pointer;
		position: relative;
		display: block;
	}
	.nav-icon-menu {
		width: 100%;
		height: 15%;
		position: absolute;
		transform-origin: 0 0 0;
		background: currentColor;
	}
	.nav-icon-menu:nth-child(1) {
		top: 10%;
	}
	.nav-icon-menu:nth-child(2) {
		top: 42.5%;
	}
	.nav-icon-menu:nth-child(3) {
		top: 75%;
	}
	.nav-bar.active .nav-icon-menu:nth-child(1) {
		height: 13%;
		transform: rotate(45deg) translate3d(13%,-112%,0);
	}
	.nav-bar.active .nav-icon-menu:nth-child(2) {
		transform: rotate(45deg) translate3d(-10%,-250%,0);
	}
	.nav-bar.active .nav-icon-menu:nth-child(3) {
		transform: rotate(-45deg) translate3d(3%,67%,0);
	}
	`;

	/*
		main
	*/
	document.addEventListener('DOMContentLoaded', function () {
		/*
			add stylesheet
		*/
		var eStyle = document.createElement('style');
		var nStyle = document.createTextNode(sStyle);
		eStyle.appendChild(nStyle);
		document.head.appendChild(eStyle);

		var navBar = document.querySelector('.nav-bar');
		var navListAll = navBar.querySelectorAll('ul');
		var navListMain = navListAll[0];
		navListMain.setAttribute('class', 'nav-list-main');

		/*
			arrows
		*/
		var arrowDown = document.createElement('div');
		arrowDown.setAttribute('class', ' nav-icon-arrow-down');

		var arrowRight = document.createElement('div');
		arrowRight.setAttribute('class', 'nav-icon-arrow-right');

		/*
			close
		*/
		var closeA = document.createElement('a');
		var closeLi = document.createElement('li');
		var closeText = document.createTextNode('Close');

		closeA.href = '#!';
		closeA.appendChild(arrowDown.cloneNode(true));
		closeA.appendChild(closeText);
		closeLi.appendChild(closeA);

		/*
			icon
		*/
		var navTool = document.createElement('div');
		navTool.setAttribute('class', 'nav-tool');

		var navIconWrap = document.createElement('div');
		navIconWrap.setAttribute('class', 'nav-icon-menu-wrap');

		var navIcon = document.createElement('div');
		navIcon.setAttribute('class', 'nav-icon-menu');

		for (var i = 0; i < 3; i++) navIconWrap.appendChild(navIcon.cloneNode(true));

		navIconWrap.addEventListener('click', function () {
			navListMain.classList.toggle('active');
			navBar.classList.toggle('active');
		});

		navTool.appendChild(navIconWrap);
		navBar.insertBefore(navTool, navBar.firstElementChild);

		/*
			main
		*/
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

}());
