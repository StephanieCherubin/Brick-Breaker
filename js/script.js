/* eslint-disable no-alert */
/* eslint-disable no-undef */

function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

// function differentColor() {
//   return `rgb(
//     ${Math.floor(255 - 42.5 * c)},
//     ${Math.floor(255 - 42.5 * r)},
//     0)`;
// }

// --------------------------Ball--------------------------

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

// -----------------------Life------------------------------

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

// ------------------------Paddle-------------------------

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

// --------------------------Brick--------------------------

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
    ctx.fillStyle = randomColor();
    ctx.fill();
    ctx.closePath();
  }
}

// --------------------------Bricks---------------------------

class Bricks {
  constructor() {
    this.brickRowCount = 6;
    this.brickColumnCount = 8;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 20;
    this.bricks = [];
    this.createBricks();
  }

  createBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const x = (c * (75 + this.brickPadding)) + this.brickOffsetLeft;
        const y = (r * (20 + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick(x, y);
      }
    }
  }

  differentColor() {
    return `rgb(
      ${Math.floor(255 - 42.5 * this.brickColumnCount)},
      ${Math.floor(255 - 42.5 * this.brickRowCount)},
      0)`;
  }

  render(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }
}

// ----------------------Score------------------------
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

// --------------------Game--------------------------
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

const game = new Game();
game.draw();
