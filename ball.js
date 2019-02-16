class Ball {
    constructor(x, y, radius = 10) {
      this.x = x;
      this.y = y;
      this.dx = 2;
      this.dy = -2;
      this.radius = radius;
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
  
  ball.move();
  ball.render(ctx);
  