class Ball {
  constructor(x, y, radius = 10) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.reset();
  }

  reset() {
    this.dx = 5;
    this.dy = -5;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}
