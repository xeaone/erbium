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
			-o-transition: all 300ms ease-in-out;
			-ms-transition: all 300ms ease-in-out;
			-moz-transition: all 300ms ease-in-out;
			-webkit-transition: all 300ms ease-in-out;
		}
		.nav-bar > svg {
			cursor: pointer;
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
			.nav-bar > svg {
				height: 0;
				padding: 0;
				display: block;
			}
			.nav-bar li {
				position: relative;
			}
			.nav-bar ul ul > li {
				display: block;
			}
			/* nav-list-all */
			.nav-bar a+ul {
				transform: translate3d(0%,-50%,0) scale3d(1,0,1);
				-o-transform: translate3d(0%,-50%,0) scale3d(1,0,1);
				-ms-transform: translate3d(0%,-50%,0) scale3d(1,0,1);
				-moz-transform: translate3d(0%,-50%,0) scale3d(1,0,1);
				-webkit-transform: translate3d(0%,-50%,0) scale3d(1,0,1);
			}
			/* nav-list-all.active */
			.nav-bar li.active > a+ul {
				transform: translate3d(0%,0%,0) scale3d(1,1,1);
				-o-transform: translate3d(0%,0%,0) scale3d(1,1,1);
				-ms-transform: translate3d(0%,0%,0) scale3d(1,1,1);
				-moz-transform: translate3d(0%,0%,0) scale3d(1,1,1);
				-webkit-transform: translate3d(0%,0%,0) scale3d(1,1,1);
			}
		}
		@media screen and (max-width: 940px) {
			.nav-bar {
				overflow: hidden;
			}
			.nav-bar > svg {
				z-index: 1;
				height: 40px;
				display: block;
				position: relative;
				padding: 16px calc(100% - 56px) 16px 16px;
			}
			.nav-bar li, .nav-bar a {
				display: block;
			}
			.nav-bar li > a {
				width: 100%;
				padding-left: 0;
				padding-right: 0;
			}
			/* nav-list-first */
			.nav-bar > ul {
				max-height: 0vh;
				position: relative;
			}
			/* nav-list-first.active */
			.nav-bar > ul.active {
				max-height: 100vh;
			}
			/* nav-list-all */
			.nav-bar a+ul {
				/*max-width: 0vw;*/
				top: 0px;
				right: 0px;
				height: 100%;
				position: absolute;
				transform: translate3d(100%,0%,0);
				-o-transform: translate3d(100%,0%,0);
				-ms-transform: translate3d(100%,0%,0);
				-moz-transform: translate3d(100%,00%,0);
				-webkit-transform: translate3d(100%,0%,0);
			}
			/* nav-list-all.active */
			.nav-bar li.active > a+ul {
				/*max-width: 100vw;*/
				transform: translate3d(0%,0%,0);
				-o-transform: translate3d(0%,0%,0);
				-ms-transform: translate3d(0%,0%,0);
				-moz-transform: translate3d(0%,0%,0);
				-webkit-transform: translate3d(0%,0%,0);
			}
		}
		.nav-bar > svg > path {
			transform-origin: 0 0;
			-o-transform-origin: 0 0;
			-ms-transform-origin: 0 0;
			-moz-transform-origin: 0 0;
			-webkit-transform-origin: 0 0;
		}
		.nav-top-rotate {
			transform: rotate(45deg) translate3d(20px, -10px, 0);
			transform: -o-rotate(45deg) -o-translate3d(20px, -10px, 0);
			transform: -ms-rotate(45deg) -ms-translate3d(20px, -10px, 0);
			transform: -moz-rotate(45deg) -moz-translate3d(20px, -10px, 0);
			transform: -webkit-rotate(45deg) -webkit-translate3d(20px, -10px, 0);
		}
		.nav-middle-rotate {
			transform: rotate(45deg) translate3d(20px, -45px, 0);
			transform: -o-rotate(45deg) -o-translate3d(20px, -45px, 0);
			transform: -ms-rotate(45deg) ms-translate3d(20px, -45px, 0);
			transform: -moz-rotate(45deg) -moz-translate3d(20px, -45px, 0);
			transform: -webkit-rotate(45deg) -webkit-translate3d(20px, -45px, 0);
		}
		.nav-bottom-rotate {
			transform: rotate(-45deg) translate3d(-55px, -15px, 0);
			transform: -o-rotate(-45deg) -o-translate3d(-55px, -15px, 0);
			transform: -ms-rotate(-45deg) -ms-translate3d(-55px, -15px, 0);
			transform: -moz-rotate(-45deg) -moz-translate3d(-55px, -15px, 0);
			transform: -webkit-rotate(-45deg) -webkit-translate3d(-55px, -15px, 0);
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
		var navSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		navSvg.setAttribute('class', 'nav-bg');
		navSvg.setAttribute('viewBox', '0 0 100 100');

		var navTop = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		navTop.setAttribute('class', 'nav-icon');
		navTop.setAttribute('d', 'M-.016 9.945h100v13.622h-100z');

		var navMiddle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		navMiddle.setAttribute('class', 'nav-icon');
		navMiddle.setAttribute('d', 'M-.016 44.19h100v13.62h-100z');

		var navBottom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		navBottom.setAttribute('class', 'nav-icon');
		navBottom.setAttribute('d', 'M-.016 77.433h100v13.622h-100z');

		navSvg.appendChild(navTop);
		navSvg.appendChild(navMiddle);
		navSvg.appendChild(navBottom);

		navSvg.addEventListener('click', function () {
			navListFirst.classList.toggle('active');
			navTop.classList.toggle('nav-top-rotate');
			navMiddle.classList.toggle('nav-middle-rotate');
			navBottom.classList.toggle('nav-bottom-rotate');
		});

		navBar.insertBefore(navSvg, navBar.firstElementChild);

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
