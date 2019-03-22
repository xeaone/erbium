
export default /*css*/`
.e-gallery {
	color: white;
}
.e-gallery, .e-gallery div, .e-gallery img, .e-gallery a {
	transition: all 300ms ease;
}
.e-gallery img {
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-o-user-select: none;
	user-select: none;
	cursor: pointer;
}
.e-gallery .e-viewer {
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-box;
	display: -webkit-flex;
	display: -moz-flex;
	display: flex;

	flex-wrap: nowrap;
	-moz-flex-wrap: nowrap;
	-webkit-flex-wrap: nowrap;

	flex-direction: row;
	-moz-flex-direction: row;
	-webkit-flex-direction: row;

	-webkit-align-self: center;
	align-self: center;

	align-content: space-around;
	-webkit-align-content: space-around;

	justify-content: space-around;
	-moz-justify-content: space-around;
	-webkit-justify-content: space-around;

	top: 0;
	left: 0;
	opacity: 0;
	width: 100vw;
	height: 100vh;
	position: fixed;
	background: rgba(0,0,0,0.6);
	transform: translate3d(100%,0,0);
}
.e-gallery .e-viewer .e-container-wrap {
	-webkit-box-flex: 0 1 auto;
	-moz-box-flex: 0 1 auto;
	-webkit-flex: 0 1 auto;
	-moz-flex: 0 1 auto;
	-ms-flex: 0 1 auto;
	flex: 0 1 auto;

	align-self: center;
	-webkit-align-self: center;

	overflow: hidden;

	width: 85vw;
	height: 85vh;
}
.e-gallery .e-viewer .e-container {
	width: 100%;
	height: 100%;
	position: relative;
}
.e-gallery .e-viewer .e-container-wrap .e-container img {
	top: 50%;
	left: 50%;
	margin: 0;
	padding: 0;
	opacity: 0;
	border: none;
	max-width: none;
	border-radius: 0;
	max-height: none;
	box-shadow: none;
	position: absolute;
}
.e-gallery .e-close, .e-gallery .e-arrow-left-wrap, .e-gallery .e-arrow-right-wrap {
	cursor: pointer;
	background: rgba(0,0,0,0.1);
}
.e-gallery .e-close:hover, .e-gallery .e-arrow-left-wrap:hover, .e-gallery .e-arrow-right-wrap:hover {
    background: rgba(0, 0, 0, 0.3);
}
.e-gallery .e-close {
	top: 1%;
	right: 1%;
    width: 55px;
    height: 55px;
	position: absolute;
}
.e-gallery .e-close:after {
    content: '';
	top: 7.5px;
	left: 25.5px;
	height: 40px;
    position: absolute;
    transform: rotate(45deg);
    border-left: 3px solid currentColor;
}
.e-gallery .e-close:before {
    content: '';
	top: 7.5px;
	left: 25.5px;
	height: 40px;
    position: absolute;
    transform: rotate(-45deg);
    border-left: 3px solid currentColor;
}
.e-gallery .e-arrow-left, .e-gallery .e-arrow-right {
	width: 0;
	margin: auto;
	cursor: pointer;
	border-top: 0.7rem solid transparent;
	border-bottom: 0.7rem solid transparent;
}
.e-gallery .e-arrow-left {
	border-right: 0.5rem solid currentColor;
}
.e-gallery .e-arrow-right {
	border-left: 0.5rem solid currentColor;
}
.e-gallery .e-arrow-left-wrap, .e-gallery .e-arrow-right-wrap {
	margin: 0 1vw;
	padding: 1rem;
}
.e-gallery .e-arrow-left-wrap {
	align-self: center;
}
.e-gallery .e-arrow-right-wrap {
	align-self: center;
}
.e-gallery.active .e-viewer {
	opacity: 1;
	z-index: 1000;
	transform: translate3d(0,0,0);
}
.e-gallery .e-spinner {
	margin: auto;
	width: 1.5rem;
	height: 1.5rem;
	border: solid calc(1.5rem/5) rgba(0, 0, 0, 0.3);
	border-top: solid calc(1.5rem/5) white;
	border-radius: 50%;

	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 1;
	display: none;
	position: absolute;

	animation: spin 2s linear infinite;
	-o-animation: spin 2s linear infinite;
	-ms-animation: spin 2s linear infinite;
	-moz-animation: spin 2s linear infinite;
	-webkit-animation: spin 2s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@-o-keyframes spin { 0% { -o-transform: rotate(0deg); } 100% { -o-transform: rotate(360deg); } }
@-ms-keyframes spin { 0% { -ms-transform: rotate(0deg); } 100% { -ms-transform: rotate(360deg); } }
@-moz-keyframes spin { 0% { -moz-transform: rotate(0deg); } 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); }100% { -webkit-transform: rotate(360deg); } }
`;
