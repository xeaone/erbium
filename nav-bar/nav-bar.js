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
		.nav-bar > svg {
			z-index: 1;
			width: 40px;
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
		.nav-bar > ul {
			max-height: 0vh;
			position: relative;
		}
		.nav-bar > ul.active {
			max-height: 100vh;
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
	.nav-bar > svg > g > path {
		transform-origin: 0 0 0;
	}
	.nav-bar > svg:hover path:nth-child(1) {
		transform: translate3d(0px, 5px, 0);
	}
	.nav-bar > svg:hover path:nth-child(3) {
		transform: translate3d(0px, -5px, 0);
	}
	.nav-bar.active > svg > g > path:nth-child(1) {
		transform: matrix(0.7, 0.7, -0.7, 0.7, 27.3, 2.7);
	}
	.nav-bar.active > svg > g > path:nth-child(2) {
		transform: matrix(0.7, 0.7, -0.7, 0.7, 50, -20);
	}
	.nav-bar.active > svg > g > path:nth-child(3) {
		transform: matrix(0.7, -0.7, 0.7, 0.7, -42, 27.3);
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

		var navG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		navSvg.appendChild(navG);

		var navTop = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		navTop.setAttribute('class', 'nav-icon');
		navTop.setAttribute('d', 'M0 10 h100 v15 h-100 z');
		navG.appendChild(navTop);

		var navMiddle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		navMiddle.setAttribute('class', 'nav-icon');
		navMiddle.setAttribute('d', 'M0 42.5 h100 v15 h-100 z');
		navG.appendChild(navMiddle);

		var navBottom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		navBottom.setAttribute('class', 'nav-icon');
		navBottom.setAttribute('d', 'M0 75 h100 v15 h-100 z');
		navG.appendChild(navBottom);

		navSvg.addEventListener('click', function () {
			navListFirst.classList.toggle('active');
			var isActive = navBar.classList.toggle('active');

			if (isIeOrEdge()) {
				if (isActive) {
					navTop.setAttribute('transform', 'matrix(0.7, 0.7, -0.7, 0.7, 27.3, 2.7)');
					navMiddle.setAttribute('transform', 'matrix(0.7, 0.7, -0.7, 0.7, 50, -20)');
					navBottom.setAttribute('transform', 'matrix(0.7, -0.7, 0.7, 0.7, -42, 27.3)');
				} else {
					navTop.setAttribute('transform', '');
					navMiddle.setAttribute('transform', '');
					navBottom.setAttribute('transform', '');
				}
			}
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

		/*
			helpers
		*/
		function isIeOrEdge () {
			var isIe = /*@cc_on!@*/false || !!document.documentMode;
			return isIe || !!window.StyleMedia;
		}
	});

}());
