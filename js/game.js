class Game {
  constructor() {
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 30);
    this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 10);
    this.bricks = new Bricks();
    this.lives = new Life(this.canvas.width - 75);
    this.score = new Score();
    this.rightPressed = false;
    this.leftPressed = false;
    this.handlers();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.collisionDectection();
    this.drawBall();
    this.drawPaddle();
    this.drawBricks();
    this.drawScore();
    this.drawLife();
    this.paddleMove();
    this.playGame();
    requestAnimationFrame(this.draw.bind(this));
  }

  drawBall() {
    this.ball.render(this.ctx);
    this.ball.move();
  }

  drawBricks() {
    this.bricks.render(this.ctx);
  }

  drawLife() {
    this.lives.render(this.ctx);
  }

  drawPaddle() {
    this.paddle.render(this.ctx);
  }

  drawScore() {
    this.score.render(this.ctx);
  }

  paddleMove() {
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.x += 7;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
    }
  }

  collisionDectection() {
    for (let c = 0; c < this.bricks.brickColumnCount; c += 1) {
      for (let r = 0; r < this.bricks.brickRowCount; r += 1) {
        const b = this.bricks.bricks[c][r];
        if (b.status === 1) {
          if (this.ball.x > b.x && this.ball.x < b.x + b.width
              && this.ball.y > b.y && this.ball.y < b.y + b.height) {
            this.ball.dy = -this.ball.dy;
            b.status = 0;
            this.score.score += 1;
            if (this.score.score === this.bricks.brickRowCount * this.bricks.brickColumnCount) {
              // eslint-disable-next-line no-alert
              alert('You win! Congratulations!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  playGame() {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives.lives -= 1;
        if (!this.lives.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.reset();
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }
  }

  handlers() {
    document.addEventListener('keydown', (e) => {
      this.keyDownHandler(e);
    }, false);

    document.addEventListener('keyup', (e) => {
      this.keyUpHandler(e);
    }, false);

    document.addEventListener('mousemove', (e) => {
      this.mouseMoveHandler(e);
    }, false);
  }
}