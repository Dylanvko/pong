import {SVG_NS, KEYS} from '../settings'

export default class Paddle {

  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch(event.key) {
        case up: 
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });

  //Keyevent to make paddles larger
    document.addEventListener('keydown', event => {
      if ( event.key === KEYS.g ) {
        this.height = this.height * 1.1
      }
    });
  
  //Keyevent to make paddles smaller
    document.addEventListener('keydown', event => {
      if ( event.key === KEYS.b ) {
        this.height = this.height * 0.91
      }
    });
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return { leftX, rightX, topY, bottomY };
  }

  up() {
    this.y = Math.max((this.y - this.speed), 0);
  }

  down() {
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    // rect.setAttributeNS(null, '')
    rect.setAttributeNS(null, 'width', this.width);
    rect.setAttributeNS(null, 'height', this.height);
    rect.setAttributeNS(null, 'fill', '#FFFFFF');
    rect.setAttributeNS(null, 'x', this.x);
    rect.setAttributeNS(null, 'y', this.y);
    svg.appendChild(rect);
  }
}