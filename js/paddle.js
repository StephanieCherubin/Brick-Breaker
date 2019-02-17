class Paddle {
    constructor(paddleX, paddleHeight = 10, paddleWidth = 75) {
      this.paddleX = paddleX;
      this.paddleHeight = paddleHeight;
      this.paddleWidth = paddleWidth;
      this.paddleColor = randomColor();
    }
  
    render(ctx) {
      ctx.beginPath();
      ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
      ctx.fillStyle = this.paddleColor;
      ctx.fill();
      ctx.closePath();
    }
  }
  
  paddle.render(ctx);