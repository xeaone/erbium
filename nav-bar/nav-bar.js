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
	.nav-bar > ul {
		width: 100%;
		list-style: none;
		text-align: center;
	}
	.nav-bar li {
		text-align: center;
		display: inline-block;
	}
	.nav-bar li:hover {
		background: rgba(0,0,0,0.1);
	}
	.nav-bar li > a {
		padding: 24px 64px;
		display: inline-block;
	}
	.nav-bar a+ul {
		width: 100%;
	    position: absolute;
	}
	.nav-bar a+ul > li:nth-child(1) {
		text-align: left;
	}
	.nav-bar a+ul > li:nth-child(1) > a {
		padding: 16px;
		text-align: left;
		font-weight: bold;
	}
	@media screen and (min-width: 940px) {
		.nav-bar > .nav-tool {
			height: 0px;
			padding: 0px;
		}
		.nav-bar > .nav-tool > .nav-icon-wrap  {
			transform: translate3d(-150%, 0%, 0);
		}
		.nav-bar li {
			position: relative;
		}
		.nav-bar > ul {
			max-height: 1000px;
		}
		.nav-bar ul ul > li {
			display: block;
		}
		.nav-bar a+ul {
			transform: translate3d(0%,-50%,0) scale3d(1,0,1);
		}
		.nav-bar li.active > a+ul {
			transform: translate3d(0%,0%,0) scale3d(1,1,1);
		}
	}
	@media screen and (max-width: 940px) {
		.nav-bar {
			overflow: hidden;
		}
		.nav-bar > .nav-tool {
			width: 100%;
			height: 50px;
			padding: 16px;
		}
		.nav-bar > .nav-tool > .nav-icon-wrap {
			transform: translate3d(0%, 0%, 0);
		}
		.nav-bar li, .nav-bar a {
			display: block;
		}
		.nav-bar li > a {
			width: 100%;
			padding-left: 0;
			padding-right: 0;
		}
		.nav-bar > ul {
			max-height: 0px;
			position: relative;
		}
		.nav-bar > ul.active {
			max-height: 1000px;
		}
		.nav-bar a+ul {
			top: 0px;
			right: 0px;
			height: 100%;
			position: absolute;
			transform: translate3d(100%,0%,0);
		}
		.nav-bar li.active > a+ul {
			transform: translate3d(0%,0%,0);
		}
	}
	.nav-tool {
		display: block;
	}
	.nav-icon-wrap  {
		height: 50px;
		width: 50px;
		cursor: pointer;
		position: relative;
		display: block;
	}
	.nav-icon {
		width: 100%;
		height: 15%;
		background: black;
		position: absolute;
		transform-origin: 0 0 0;
	}
	.nav-icon:nth-child(1) {
		top: 10%;
	}
	.nav-icon:nth-child(2) {
		top: 42.5%;
	}
	.nav-icon:nth-child(3) {
		top: 75%;
	}
	.nav-bar.active .nav-icon:nth-child(1) {
		height: 13%;
		transform: rotate(45deg) translate3d(13%, -112%, 0);
	}
	.nav-bar.active .nav-icon:nth-child(2) {
		transform: rotate(45deg) translate3d(-10%, -250%, 0);
	}
	.nav-bar.active .nav-icon:nth-child(3) {
		transform: rotate(-45deg) translate3d(3%, 67%, 0);
	}
	`;

	/*
		style
	*/
	var eStyle = document.createElement('style');
	var nStyle = document.createTextNode(sStyle);
	eStyle.setAttribute('title', 'nav-bar');
	eStyle.appendChild(nStyle);
	document.head.appendChild(eStyle);

	/*
		main
	*/
	document.addEventListener('DOMContentLoaded', function () {
		var navBar = document.querySelector('.nav-bar');
		var navListAll = navBar.querySelectorAll('ul');
		var navListFirst = navListAll[0];
		navListFirst.setAttribute('class', 'nav-list-first');

		/*
			back
		*/
		var backArrow = String.fromCharCode(9664);
		var backLi = document.createElement('li');
		var backA = document.createElement('a');
		backA.href = '#!';
		backA.innerText = backArrow + ' Back';
		backLi.appendChild(backA);

		/*
			icon
		*/
		var navTool = document.createElement('div');
		navTool.setAttribute('class', 'nav-tool');

		var navIconWrap = document.createElement('div');
		navIconWrap.setAttribute('class', 'nav-icon-wrap');

		var navIcon = document.createElement('div');
		navIcon.setAttribute('class', 'nav-icon');

		for (var i = 0; i < 3; i++) navIconWrap.appendChild(navIcon.cloneNode(false));

		navIconWrap.addEventListener('click', function () {
			navListFirst.classList.toggle('active');
			navBar.classList.toggle('active');
		});

		navTool.appendChild(navIconWrap);
		navBar.insertBefore(navTool, navBar.firstElementChild);

		/*
			main
		*/
		for (var i = 1, l = navListAll.length; i < l; i++) {
			navListAll[i].setAttribute('class', 'nav-list-all');
			var backLiClone = backLi.cloneNode(true);
			navListAll[i].insertBefore(backLiClone, navListAll[i].firstElementChild);

			/*
				back
			*/
			backLiClone.addEventListener('click', function() {
				this.parentElement.parentElement.classList.toggle('active');
			});

			/*
				next
			*/
			navListAll[i].previousElementSibling.addEventListener('click', function() {
				this.parentElement.classList.toggle('active');
			});
		}
	});

}());
