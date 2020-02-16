// create canvas for game
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// get button for new game
var newgameBtn = document.getElementById("newgame");
newgameBtn.addEventListener("click", newGame)

// create ball object
var ball;
// create Paddle object
var paddle;
var paddle2;
let bricks = [];
let score = 0;
let lives = 3;
var animation = [];
var brickColumnCount = 9
var brickRowCount = 6
    // add events for keys
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


// make bricks object and load them on array
function loadBricks() {
    bricks = []
    for (var r = 0; r < brickRowCount; r++) {
        for (var c = 0; c < brickColumnCount; c++) {
            var brickX = c * (Brick.width + Brick.padding) + Brick.marginLeft
            var brickY = r * (Brick.height + Brick.padding) + Brick.marginUp
            let brick = new Brick(brickX, brickY, true);
            bricks.push(brick)
        }
    }
}

// first lvl render
function lvlOne() {
    animation[0] = window.requestAnimationFrame(lvlOne);
    render()
    lvlOneFunction();
    // check if player win lvl 1
    if (score == bricks.length) {
        window.cancelAnimationFrame(animation[0])
        clear();
        loadBricks();
        ball = new Ball()
        paddle = new Paddle();
        paddle2 = new Paddle(20);
        ball.dx = 5;
        ball.dy = 5;
        lvlTwo();
    }
}

// second lvl render
function lvlTwo() {
    animation[1] = window.requestAnimationFrame(lvlTwo)
    render();
    paddle2.move();
    paddle2.draw();
    lvlTwoFunction();
    if (score == (2 * bricks.length)) {
        // alert("Winner !!!")
    }
}

// lvl one logic easy mode bounce on top edge
function lvlOneFunction() {
    // bounce on top 
    if (ball.y <= ball.r + 15) {
        ball.dy = -ball.dy;
    }
}

// lvl two logic easy mode bounce on top edge
function lvlTwoFunction() {

    if (ball.x + (0.75 * ball.r) > paddle.x && ball.x - (0.75 * ball.r) < paddle.x + Paddle.width && ball.y <= 21 + Paddle.height + ball.r) {
        ball.dy = -ball.dy
    }
    if (ball.y + ball.dy <= ball.r + 20) {
        lives -= 1;
        //end game if no more lives
        if (lives == 0) {
            gameOver()
        } else {
            ball = new Ball();
            paddle = new Paddle();
            paddle2 = new Paddle(20);
        }
    }
}

// render all game objects
function render() {
    // clear canvas
    clear()
        //move paddle on arrow key down
    paddle.move();
    // move ball
    ball.move();
    // draw ball
    ball.draw();
    // draw paddle
    paddle.draw();
    // draw bricks and handle ball touchs 
    brickCollision();
    // handle ball and paddle collsion
    ballColloision();
    drawScore();
    drawLives();
}

// ball colloision with bottem edge
function ballColloision() {
    // bounce if on bottom paddle
    if (ball.y + Paddle.height + 6 >= canvas.height - ball.r && ball.x + (0.75 * ball.r) > paddle.x && ball.x - (0.75 * ball.r) < paddle.x + Paddle.width) {
        ball.dy = -ball.dy;
    }
    // lose game if ball not on bottem paddle
    if (ball.y + 5 >= canvas.height - ball.r) {
        lives -= 1;
        //end game if no more lives
        if (lives <= 0) {
            gameOver()
        } else {
            ball = new Ball();
            paddle = new Paddle();
            paddle2 = new Paddle(20);
        }
    }
}


// handle ball and bricks collision 
function brickCollision() {
    bricks.forEach(function(brick) {
        if (brick.active) {
            if (ball.x + (ball.r * 0.5) > brick.x && ball.x < brick.x + Brick.width + (ball.r * 0.5) && ball.y + (ball.r * 0.5) > brick.y && ball.y < brick.y + Brick.height + (ball.r * 0.5)) {
                ball.dy = -ball.dy;
                brick.active = false;
                score++
            }
            brick.draw()
        }
    })
}

// clear canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// handle key hold
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

// handle key up
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// draw remaining lives at right top
function drawLives() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("lives: " + lives, 500, 12);
}

// draw score at top 
function drawScore() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 50, 12);
}


// end game
function gameOver() {
    stopAllAnimate()
    clear()
    ctx.font = "25px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Over  You Score = " + score, 150, 200);
    newgameBtn.style.display = "block";

}

// start new game 
function newGame() {
    score = 0
    lives = 3
    newgameBtn.style.display = "none";
    loadBricks();
    ball = new Ball()
    paddle = new Paddle();
    lvlOne();
}

// stop all render animation
function stopAllAnimate() {
    animation.forEach(ani => window.cancelAnimationFrame(ani))
}