/* eslint-disable no-alert */
/* eslint-disable no-undef */


// ball
// paddle
// brick
// score
// lives
// game


// class Game {
//   constructor() {
//     this.ball
//   }
// }


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
    ctx.fillStyle = '#af9009';
    ctx.fill();
    ctx.closePath();
  }
}

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas.width / 2, canvas.height - 30);
ball.move();
ball.render(ctx);

class Paddle {
  constructor(paddleX, paddleHeight = 10, paddleWidth = 75) {
    this.paddleX = paddleX;
    this.paddleY = 310;
    this.paddleHeight = paddleHeight;
    this.paddleWidth = paddleWidth;
    this.paddleColor = '#dc1000';
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);

    console.log(this.paddleX, this.paddleY, canvas.height, this.paddleHeight, this.paddleWidth, this.paddleHeight);

    ctx.fillStyle = this.paddleColor;
    ctx.fill();
    ctx.closePath();
  }
}
const paddle = new Paddle(canvas.width - 75 / 2);
paddle.render(ctx);

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 6;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 20;

let score = 0;

let lives = 50;

// function randomColor() {
//   return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
// }

const bricks = [];

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
    };
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - this.paddleWidth / 2;
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

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
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

function drawScore() {
  ctx.font = '18px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '18px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall() {
  ball.render(ctx);
}

function drawPaddle() {
 paddle.render(ctx)
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        // ctx.fillStyle = randomColor();
        ctx.fillStyle = `rgb(
          ${Math.floor(255 - 42.5 * c)},
          ${Math.floor(255 - 42.5 * r)},
          0)`;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
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
        paddleX = (canvas.width - this.paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  requestAnimationFrame(draw);
}
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

draw();
