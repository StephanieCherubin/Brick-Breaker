class Brick {
    constructor(brickX, brickY, brickWidth = 75, brickHeight = 20, brickStatus = 1) {
      this.brickX = brickX; // { brickX: x }
      this.brickY = brickY; // { brickX: x, brickY: y }
      this.brickColor = randomColor();
      this.brickWidth = brickWidth;
      this.brickHeight = brickHeight;
      this.brickStatus = brickStatus;
    }
  
    render(ctx) { // { ..., render: () => {} }
      ctx.beginPath();
      const {
        brickX, brickY, brickHeight, brickWidth,
      } = this;
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = this.brickColor;
      ctx.fill();
      ctx.closePath();
    }
  }
  // -------------------------------------------------
  class Bricks {
    constructor(brickRowCount = 6, brickColumnCount = 8,
      brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 20) {
      this.brickRowCount = brickRowCount;
      this.brickColumnCount = brickColumnCount;
      this.brickPadding = brickPadding;
      this.brickOffsetTop = brickOffsetTop;
      this.brickOffsetLeft = brickOffsetLeft;
      this.bricks = [];
      for (let c = 0; c < this.brickColumnCount; c += 1) {
        this.bricks[c] = []; // bricks[0] = []
        // bricks.push( [] )
        for (let r = 0; r < this.brickRowCount; r += 1) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c].push(new Brick(brickX, brickY));
        }
      }
    }
  
    render(ctx) {
      for (let c = 0; c < this.brickColumnCount; c += 1) {
        for (let r = 0; r < this.brickRowCount; r += 1) {
          if (this.bricks[c][r].status === 1) {
            ctx.beginPath();
            ctx.rect(
              this.bricks[c][r].brickX,
              this.bricks[c][r].brickY,
              this.brickWidth,
              this.brickHeight,
            );
            ctx.fillStyle = this.bricks[c][r].brickColor;
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
  }