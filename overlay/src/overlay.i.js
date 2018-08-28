
export default /*css*/`

	.e-overlay {
		z-index: 1;
	}
	.e-overlay-wrap {
		top: 0;
		right: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		display: flex;
		position: fixed;
		align-items: center;
		pointer-events: none;
		flex-direction: column;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.e-overlay-close {
		top: 0;
		right: 0;
		margin: 1vh 1vw;
		position: absolute;
		display: inline-block;

		cursor: pointer;
		min-width: 3rem;
		min-height: 3rem;
	}
	.e-overlay-content {
		max-width: 90vw;
		max-height: 90vh;
	}
	.e-overlay-wrap.active {
		opacity: 1;
		pointer-events: initial;
	}

	.e-overlay-open {
		cursor: pointer;
		min-width: 3rem;
		min-height: 3rem;
		display: inline-block;
	}

	.e-overlay-close > .e-overlay-close-icon, .e-overlay-open > .e-overlay-open-icon {
		width: 3rem;
		height: 0.18rem;
		position: absolute;
		transform-origin: 50% 50%;
		background-color: currentColor;
	}

	.e-overlay-open-icon:nth-of-type(1) {
		transform:
			rotate(45deg)
			translate(calc(1.5rem/1.5), calc(1.5rem/1));
	}

	.e-overlay-open-icon:nth-of-type(2) {
		transform:
			rotate(-45deg)
			translate(-0.45rem, 2.75rem);
	}

	.e-overlay-close-icon:nth-of-type(1) {
		transform:
			rotate(45deg)
			translate(calc(1.5rem/1.5), calc(1.5rem/1.5));
	}

	.e-overlay-close-icon:nth-of-type(2) {
		transform:
			rotate(-45deg)
			translate(calc(-1.5rem/1.5), calc(1.5rem/1.5));
	}
`;
