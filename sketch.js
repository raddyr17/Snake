let WINDOW_SIZE = 32;
let HEIGHT = (WIDTH = WINDOW_SIZE * SNAKE_SIZE);

let snake, food;

function setup() {
    createCanvas(HEIGHT, WIDTH);
    snake = new Snake(WIDTH / 2, HEIGHT / 2);
    food = new Food();
    frameRate(60);
}

function draw() {
    background(0);
    let points = snake.body.length - 1;
    showPoints(points);
    snake.move();
    snake.draw();
    food.draw();
    snake.handleControls();
    snake.updateSnakeEffects();

    if (snake.isColliding()) {
        if (!alert("Game Over\n\nYour score: " + points))
        {
            location.reload()
        }
        noLoop();
    }

    if (snake.eatFood(food)) {
        food = new Food();
    }
}

const showPoints = (points) => {
    strokeWeight(4);
    fill(255, 255, 255);
    textSize(40);
    text("Points " + points, 330, 40);
}

function mousePressed() {
    snake.elongate();
}