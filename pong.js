// Ball location
let ballX = 400, ballY = 300;
let dx = 3, dy = 2
const ballSize = 16;;

const board = document.getElementById('board');
const ball = document.getElementById('ball');
const paddle1 = document.getElementById('paddle1');
let paddle1y = 100;
let paddle1angle = 0;
const paddle2 = document.getElementById('paddle2');
let paddle2y = 200;
let paddle2angle = 0;
const paddleHeight = 140;
const paddleWidth = 20;

// board boundaries
const boardRect = board.getBoundingClientRect();


document.addEventListener('keydown', idKey);

function idKey(e) {
  // Player 1 uses WASD keys.
  if (e.key == "d") {
    paddle1angle = Math.min(0.25, paddle1angle + 0.02);
    paddle1.style.transform = "rotate(" + paddle1angle + "rad)";
  }
  else if (e.key == "a") {
    paddle1angle = Math.max(-0.25, paddle1angle - 0.02);
    paddle1.style.transform = "rotate(" + paddle1angle + "rad)";
  }
  else if (e.key == "w") {
    paddle1y = Math.max(boardRect.top + 5, paddle1y - 10);
    paddle1.style.top = paddle1y + "px";
  }
  else if (e.key == "s") {
    paddle1y = Math.min(boardRect.bottom - 5 - paddleHeight, paddle1y + 10);
    paddle1.style.top = paddle1y + "px";
  }
  // Player 2 uses arrow keys
  else if (e.code == "ArrowRight") {
    paddle2angle = Math.min(0.25, paddle2angle + 0.02);
    paddle2.style.transform = "rotate(" + paddle2angle + "rad)";
  }
  else if (e.code == "ArrowLeft") {
    paddle2angle = Math.max(-0.25, paddle2angle - 0.02);
    paddle2.style.transform = "rotate(" + paddle2angle + "rad)";
  }
  else if (e.code == "ArrowUp") {
    paddle2y = Math.max(boardRect.top + 5, paddle2y - 10);
    paddle2.style.top = paddle2y + "px";
  }
  else if (e.code == "ArrowDown") {
    paddle2y = Math.min(boardRect.bottom - 5 - paddleHeight, paddle2y + 10);
    paddle2.style.top = paddle2y + "px";
  }
  else {
    console.log("wrong key");
    console.log(e);
  }
}


function checkCollision(paddleEl, newX, newY) {
  const paddleRect = paddleEl.getBoundingClientRect();
  return (newY + ballSize >= paddleRect.top &&
          newY <= paddleRect.bottom &&
          newX + ballSize >= paddleRect.left &&
          newX <= paddleRect.right);
}


function moveBallLoop() {
  // Think about where the ball would be after this movement.
  let newX = ballX + dx;
  let newY = ballY + dy;

  // Bounce off of each paddle
  if (checkCollision(paddle1, newX, newY)) {
    let ballSpeed = Math.sqrt(dx*dx + dy*dy);
    let ballRadians = 0;
    if (dx != 0) {
      ballRadians = Math.atan(dy / dx);
    }
    let newBallRadians = ballRadians + Math.PI - paddle1angle;
    dx = -ballSpeed * Math.cos(newBallRadians);
    dy = ballSpeed * Math.sin(newBallRadians);
    newX = ballX + dx;
    newY = ballY + dy;
  }
  if (checkCollision(paddle2, newX, newY)) {
    let ballSpeed = Math.sqrt(dx*dx + dy*dy);
    let ballRadians = 0;
    if (dx != 0) {
      ballRadians = Math.atan(dy / dx);
    }
    let newBallRadians = ballRadians - paddle2angle;
    dx = -ballSpeed * Math.cos(newBallRadians);
    dy = ballSpeed * Math.sin(newBallRadians);
    newX = ballX + dx;
    newY = ballY + dy;
  }

  // Bounce off the walls of the board.
  if (newX < boardRect.left || newX + ballSize > boardRect.right) {
    dx = -dx;
    newX = ballX;  // Ball sticks to wall for one turn.
  }
  if (newY < boardRect.top || newY + ballSize > boardRect.bottom) {
    dy = -dy;
    newY = ballY;  // Ball sticks to wall for one turn.
  }

  // Once we have computed the new position, save that and update the elements.
  ballX = newX;
  ballY = newY;
  ball.style.left = newX + "px";
  ball.style.top = newY + "px";
}

setInterval(moveBallLoop, 25);
