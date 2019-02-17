class Life {
    constructor(position, lives = 30) {
      this.position = position;
      this.lives = lives;
    }
    render(ctx) {
      ctx.font = '18px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(`Lives: ${lives}`, this.position, 20);
    }
  }