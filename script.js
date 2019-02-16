/* eslint-disable no-alert */
/* eslint-disable no-undef */

// -------------------------------------------------

//  Make a Game Class.
// The Game itself can be an object that creates and owns all of the other objects.
// The game can hold all of the global properties, and methods.
// In the game class, have array of array for displaying bricks

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
// -------------------------------------------------
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

// -------------------------------------------------
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

// -------------------------------------------------
class Paddle {
  constructor(paddleX, paddleHeight = 10, paddleWidth = 75) {
    this.paddleX = paddleX;
    this.paddleHeight = paddleHeight;
    this.paddleWidth = paddleWidth;
    this.paddleColor = randomColor();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = this.paddleColor;
    ctx.fill();
    ctx.closePath();
  }
}

paddle.render(ctx);
// -------------------------------------------------

let rightPressed = false;
let leftPressed = false;
// -------------------------------------------------

let lives = 50;

// -------------------------------------------------
class Brick {
  constructor(brickX, brickY, brickWidth = 75, brickHeight = 20, brickStatus = 1) {
    this.brickX = brickX; // { brickX: x }
    this.brickY = brickY; // { brickX: x, brickY: y }
    this.brickColor = randomColor();
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.brickStatus = brickStatus;
  }

  render(ctx) { // { ..., render: () => {} }
    ctx.beginPath();
    const {
      brickX, brickY, brickHeight, brickWidth,
    } = this;
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = this.brickColor;
    ctx.fill();
    ctx.closePath();
  }
}
// -------------------------------------------------
class Bricks {
  constructor(brickRowCount = 6, brickColumnCount = 8,
    brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 20) {
    this.brickRowCount = brickRowCount;
    this.brickColumnCount = brickColumnCount;
    this.brickPadding = brickPadding;
    this.brickOffsetTop = brickOffsetTop;
    this.brickOffsetLeft = brickOffsetLeft;
    this.bricks = [];
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = []; // bricks[0] = []
      // bricks.push( [] )
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c].push(new Brick(brickX, brickY));
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          ctx.beginPath();
          ctx.rect(
            this.bricks[c][r].brickX,
            this.bricks[c][r].brickY,
            this.brickWidth,
            this.brickHeight,
          );
          ctx.fillStyle = this.bricks[c][r].brickColor;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}
// -------------------------------------------------

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.paddleX = relativeX - paddle.paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}
// -------------------------------------------------

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.brickStatus === 1) {
        if (ball.x > b.brickX
          && ball.x < b.brickX + b.brickWidth
          && ball.y > b.brickY
          && ball.y < b.brickY
          + brickHeight) {
          ball.dy = -ball.dy;
          b.brickStatus = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN! CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}
// -------------------------------------------------

function renderScore() {
  score.render(ctx);
}
// -------------------------------------------------

function renderLives() {
  lives.render(ctx);
}

// -------------------------------------------------

function drawBall() {
  ball.render(ctx);
}
// -------------------------------------------------
function drawPaddle() {
  paddle.render(ctx);
}
// -------------------------------------------------

function drawBricks() {
  bricks.render(ctx);
}
// -------------------------------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brick.render(ctx);
  drawBricks();
  drawBall();
  drawPaddle();
  renderScore();
  renderLives();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.paddleX && ball.x < paddle.paddleX + paddle.paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddle.paddleX < canvas.width - paddle.paddleWidth) {
    paddle.paddleX += 7;
  } else if (leftPressed && paddle.paddleX > 0) {
    paddle.paddleX -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}
// -------------------------------------------------

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
const game = new Game(ctx, canvas, ball, paddle, score, lives)
start();

