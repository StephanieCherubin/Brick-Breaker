class Paddle {
  constructor(x, y, height = 10, width = 75) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}