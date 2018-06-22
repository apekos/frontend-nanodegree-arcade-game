// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemies cross the border
    if (this.x > 505) {
        this.x = -100;
        //Randomizing the speed after crossing the border
        this.speed = 100 + Math.floor(Math.random() * 300);
    }
};

// Checking for collisions method from:
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D
Enemy.prototype.checkCollisions = function() {
    if (this.x + 75 > player.x &&
        this.x < player.x + 75 &&
        this.y + 55 > player.y &&
        this.y < player.y + 55) {
        player.lives -= 1;
        player.resetPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
        this.score = 0;
        this.lives = 3;
    }

    update() {
        // When the player reaches the water,
        // returns to original position.
        if (this.y <= 0) {
            this.y = 404;
            this.x = 202;
            this.score += 1;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Checks which key was pressed and moves the player 
    // without crossing the borders.
    handleInput(key) {
        switch (key) {
            case 'left': if (this.x > 0) {
                this.x -= 101;
            }
            break; 

            case 'up': if (this.y > 0) {
                this.y -= 83;
            }
            break;

            case 'right': if (this.x < 400) {
                this.x += 101;
            }
            break;

            case 'down': if (this.y < 400) {
                this.y += 83;
            }
        }
    }
    // Resets player to original position
    resetPosition () {
        player.x = 202;
        player.y = 404;
    }

    // Checking if the player won or not.
    // Modal from: https://sweetalert.js.org/guides/#installation
    endGame() {
        if (this.score == 5) {
            // Resetting score and lives
            this.score = 0;
            this.lives = 3;

            // Win modal
            swal({
                title: "Congratulations!",
                text: "You won!",
                icon: "success",
                button: "Play again!",
            });
        } else if (this.lives == 0) {
            // Resetting score and lives
            this.score = 0;
            this.lives = 3;

            //Loose modal
            swal({
                title: "Ooops",
                text: "You lose!",
                icon: "error",
                button: "Try again",
            });
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-500, 230, 300);
let enemy2 = new Enemy(-500, 145, 200);
let enemy3 = new Enemy(-500, 65, 250);
let player = new Player(202, 404);

allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
