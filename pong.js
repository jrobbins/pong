// Ball location                                                                                                                                                       
let ballX = 400, ballY = 300;
let ballSpeed = 3;
let ballRadians = 0.1;
const ballSize = 16;

const board = document.getElementById('board');
const ball = document.getElementById('ball');
const paddle1 = document.getElementById('paddle1');
let paddle1y = 100;
let paddle1angle = 0;
const paddle2 = document.getElementById('paddle2');
let paddle2y = 200;
let paddle2angle = 0;
let paddle1Height = 140;
let paddle2Height = 140;
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
    paddle1y = Math.min(boardRect.bottom - 5 - paddle1Height, paddle1y + 10);
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
    paddle2y = Math.min(boardRect.bottom - 5 - paddle2Height, paddle2y + 10);
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
  let dx = ballSpeed * Math.cos(ballRadians);
  let dy = ballSpeed * Math.sin(ballRadians);
  let newX = ballX + dx;
  let newY = ballY + dy;
  let newBallRadians = ballRadians;

  // Bounce off of each paddle                                                                                                                                         
  if (checkCollision(paddle1, newX, newY)) {
    newBallRadians = Math.PI - ballRadians + (paddle1angle / 2);
    ballSpeed = ballSpeed + 0.1;
    paddle1Height = Math.max(20, paddle1Height - 5);
    paddle1.style.height = paddle1Height + 'px';
  }
  else if (checkCollision(paddle2, newX, newY)) {
    newBallRadians = Math.PI - ballRadians + (paddle2angle / 2);
    ballSpeed = ballSpeed + 0.1;
    paddle2Height = Math.max(20, paddle2Height - 5);
    paddle2.style.height = paddle2Height + 'px';
  }

  // Bounce off the walls of the board.                                                                                                                                
  else if (newX < boardRect.left || newX + ballSize > boardRect.right) {
    newBallRadians = Math.PI - ballRadians;
    ballSpeed = 3;
    paddle1Height = 140;
    paddle1.style.height = paddle1Height + 'px';
    paddle2Height = 140;
    paddle2.style.height = paddle2Height + 'px';
  }
  else if (newY < boardRect.top || newY + ballSize > boardRect.bottom) {
    newBallRadians = 0 - ballRadians;
  }

  // Once we have computed the new angle, save that and update the elements.                                                                                           
  ballRadians = newBallRadians;
  dx = ballSpeed * Math.cos(ballRadians);
  dy = ballSpeed * Math.sin(ballRadians);
  ballX = ballX + dx;
  ballY = ballY + dy;
  ball.style.left = newX + "px";
  ball.style.top = newY + "px";
}

setInterval(moveBallLoop, 25);

