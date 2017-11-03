import {SVG_NS} from '../settings'

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.reset();
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;

    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5); 
    }

  //generates random position/vector for ball.

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(paddleOne, paddleTwo) {
    if (this.vx > 0) {
      //Detect collision on right side (player 2)
      let paddle = paddleTwo.coordinates(paddleTwo.x, paddleTwo.y, paddleTwo.width, paddleTwo.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX
        && this.y >= topY
        && this.y <= bottomY
      ) {
        this.vx = -this.vx;
      }

    } else {
      //Detect collision on left side (player 1)
      let paddle = paddleOne.coordinates(paddleOne.x, paddleOne.y, paddleOne.width, paddleOne.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius <= rightX
        && this.y >= topY
        && this.y <= bottomY

      ) {
        this.vx = -this.vx;
      }

    }
  }

  render(svg, paddleOne, paddleTwo) {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.wallCollision();
    this.paddleCollision(paddleOne, paddleTwo);

    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', '#FF0000');
    svg.appendChild(circle);
  }
}