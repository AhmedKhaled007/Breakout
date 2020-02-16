// ball class 
class Ball {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.r = 10;
        this.color = "#0095DD";
        this.dx = 3;
        this.dy = -3;
    }
    draw() {
        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        };
    }

    move() {
        // move ball 
        this.y += this.dy;
        this.x += this.dx;
        // Bounce on left and right sides
        if (this.x + this.dx >= canvas.width - this.r || this.x + this.dx <= this.r) {
            this.dx = -this.dx;
        }
    }
}

// brick class
class Brick {
    constructor(x, y, active) {
        this.x = x;
        this.y = y;
        this.active = active
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, Brick.width, Brick.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };
}
Brick.width = 45;
Brick.height = 20;
Brick.marginLeft = 75
Brick.marginUp = 75
Brick.padding = 5

// Bri


// class for paddle
class Paddle {
    constructor(y = canvas.height - Paddle.height - 5) {
            this.x = (canvas.width - Paddle.width) / 2;
            this.y = y;;
        }
        // draw paddle
    draw() {
            ctx.beginPath();
            ctx.rect(this.x, this.y, Paddle.width, Paddle.height);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
        // move it when right/left key down
    move() {
        if (rightPressed) {
            if (this.x < canvas.width - Paddle.width) {
                this.x += 6;
            }
        } else if (leftPressed) {
            if (this.x >= 2) {
                this.x -= 6;
            }
        }
    }
}

Paddle.height = 10;
Paddle.width = 75;