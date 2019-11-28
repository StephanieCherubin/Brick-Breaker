class Score {
  constructor(score = 0) {
    this.score = score;
  }

  render(ctx) {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}
