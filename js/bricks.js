// --------------------------Bricks---------------------------

class Bricks {
  constructor() {
    this.brickRowCount = 6;
    this.brickColumnCount = 8;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 20;
    this.bricks = [];
    this.createBricks();
  }

  createBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const x = (c * (75 + this.brickPadding)) + this.brickOffsetLeft;
        const y = (r * (20 + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick(x, y);
      }
    }
  }

  randomColor() {
    return `rgb(
      ${Math.floor(255 - 42.5 * this.brickColumnCount)},
      ${Math.floor(255 - 42.5 * this.brickRowCount)},
      0)`;
  }

  render(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }
}