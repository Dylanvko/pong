import {SVG_NS, KEYS } from '../settings';

import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.ballRadius = 8;
	
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);

		this.score1 = new Score(206, 30, 30);
		this.score2 = new Score(286, 30, 30)

	// ball Instantiator
		this.ball = new Ball(this.ballRadius, this.width, this.height)

		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;


		this.paddleOne = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			this.boardGap, 
			(this.height-this.paddleHeight)/2,
			KEYS.a,
			KEYS.z
		);

		this.paddleTwo = new Paddle(
			this.height, 
			this.paddleWidth, 
			this.paddleHeight, 
			(this.width-this.boardGap-this.paddleWidth),
			(this.height-this.paddleHeight)/2,
			KEYS.up,
			KEYS.down,
		);

		document.addEventListener('keydown', event => {
			if ( event.key === KEYS.spaceBar ) {
				this.pause = !this.pause
			}
		});
	}


	render() {
		if (this.pause) {
			return;
		}
	
		this.gameElement.innerHTML = '';
		
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.height} ${this.height}`)
		svg.setAttributeNS(null, 'version', '1.1');

		this.gameElement.appendChild(svg);

	//draws components
		this.board.render(svg);
		this.paddleOne.render(svg);
		this.paddleTwo.render(svg);
		this.ball.render(svg, this.paddleOne, this.paddleTwo);
		this.score1.render(svg, this.paddleOne.score);
		this.score2.render(svg, this.paddleTwo.score);
	}

}