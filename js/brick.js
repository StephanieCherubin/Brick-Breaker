class Brick {
  constructor(x, y, height = 20, width = 75, status = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.status = status;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = differentColor();
    ctx.fill();
    ctx.closePath();
  }
}