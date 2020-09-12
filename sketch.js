let HEIGHT = (WIDTH = 800);

let snake;

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let food = {
    x: getRandomInt(0, 32) * SNAKE_SIZE,
    y: getRandomInt(0, 32) * SNAKE_SIZE,
    draw: () => {
        fill(0, 255, 0);
        rect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE); 
    }
}


const randomizeFoodPosition = (food) => {
    food.x = getRandomInt(0, 32) * SNAKE_SIZE;
    food.y = getRandomInt(0, 32) * SNAKE_SIZE;
}

function setup() {
    createCanvas(HEIGHT, WIDTH);
    snake = new Snake(WIDTH / 2, HEIGHT / 2);
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

    if (snake.isColliding()) {
        alert("Game Over\n\nYour score: " + points);
        noLoop();
    }

    if (snake.eatFood(food)) {
        randomizeFoodPosition(food);
    }
}

const showPoints = (points) => {
    strokeWeight(4);
    fill(255, 255, 255);
    textSize(40);
    text("Points " + points, 330, 40);
    line(0, 50, WIDTH, 50);
    fill(255, 255, 255);
}