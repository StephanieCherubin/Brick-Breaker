class Life {
  constructor(placement, lives = 20) {
    this.placement = placement;
    this.lives = lives;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Lives: ${this.lives}`, this.placement, 20);
  }
}
