/* eslint-disable no-alert */
/* eslint-disable no-undef */

// -------------------------------------------------

//  Make a Game Class.
// The Game itself can be an object that creates and owns all of the other objects.
// The game can hold all of the global properties, and methods.
// In the game class, have array of array for displaying bricks


let rightPressed = false;
let leftPressed = false;
// -------------------------------------------------

let lives = 50;


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

