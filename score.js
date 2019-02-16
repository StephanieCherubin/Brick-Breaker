class Score {
    constructor(x = 8, y = 20, color = '#ffffff', score = 0, font = '18px Arial') {
      this.x = x;
      this.y = y;
      this.color = color;
      this.score = score;
      this.font = font;
    }
  
    render(ctx) {
      ctx.font = this.font;
      ctx.fillStyle = this.color;
      ctx.fillText(`Score: ${this.score}`, this.x, this.y);
    }
  }
  
  renderScore() {
    score.render(ctx);
  };