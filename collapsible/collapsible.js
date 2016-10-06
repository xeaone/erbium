(function() {
	'use strict';

	var sStyle = `
	.collapsible * {
		transition: all 300ms ease;
		-o-transition: all 300ms ease;
		-ms-transition: all 300ms ease;
		-moz-transition: all 300ms ease;
		-webkit-transition: all 300ms ease;

	}
	.collapsible {
		border-radius: 3px;
		border: solid 1px rgba(0,0,0,0.1);
	}
	.collapsible-click {
		padding: 8px;
		cursor: pointer;
		font-size: 18px;
		font-weight: bold;
		background: rgba(0,0,0,0.1);
	}
	.collapsible-click:hover {
		background: rgba(0,0,0,0.2);
	}
	.collapsible-content {
		max-height: 3em;
		overflow: hidden;
		padding: 0px 1em 0px 1em;
	}
	.collapsible-content p {
		overflow: hidden;
	}
	.collapsible-content p:nth-child(1) {
		max-height: 1em;
		position: relative;

		white-space: nowrap;
		text-overflow: ellipsis;
	}
	/*.collapsible-content p:nth-child(1)::after {
		top: 0px;
		right: 0px;
		content: '...';
		position: absolute;
	}*/
	.collapsible.active .collapsible-content {
		padding: 1em;
		max-height: 1000px;
	}
	.collapsible.active p:nth-child(1) {
		max-height: 1000px;

		white-space: normal;
		text-overflow: normal;
	}
	/*.collapsible.active p:nth-child(1)::after {
		visibility: hidden;
	}*/
	`;

	var eStyle = document.createElement('style');
	var nStyle = document.createTextNode(sStyle);
	eStyle.appendChild(nStyle);
	document.head.appendChild(eStyle);

	/*
		main
	*/

	document.addEventListener('DOMContentLoaded', function () {
		var collapsibles = document.querySelectorAll('.collapsible');

		for (var i = 0, l = collapsibles.length; i < l; i++) {
			var collapsibleClick = collapsibles[i].children[0];

			collapsibleClick.addEventListener('click', function (e) {
				e.target.parentElement.classList.toggle('active');
			});
		}
	});

}());
