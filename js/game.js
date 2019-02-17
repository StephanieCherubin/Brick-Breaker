class Game {
    constructor() {
      this.canvas = document.getElementById('myCanvas');
      this.ctx = canvas.getContext('2d');
      this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 30);
      this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 10);
      this.score = new Score(this.canvas.width - 700, this.canvas.height - 360);
      this.lives = new Life(this.canvas.width - 75);
    }
    
    randomColor() {
      return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
    }
    
    differentColor() {
      return `rgb( 
        ${Math.floor(255 - 42.5 * c)},
        ${Math.floor(255 - 42.5 * r)},
        0)`;
    } 
  
    start() {
      
    }
  }