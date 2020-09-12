let HEIGHT = (WIDTH = 800);

let snake, food

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const generateRandomFood = () => {
    const x = getRandomInt(0, 32);
    const y = getRandomInt(0, 32);
    return new BodySegment(x * 25, y * 25, createVector(0, 0));
}

function setup() {
    createCanvas(HEIGHT, WIDTH);
    snake = new Snake(WIDTH / 2, HEIGHT / 2)
    food = generateRandomFood();
    frameRate(60);
}

function draw() {
    background(0);
    for (let i = 0; i < snake.body.length; i++) {
        const bodyFragment = snake.body[i];
        bodyFragment.draw();
    }
    if (snake.isNotColliding()) {
        if (frameCount % 8 === 0) {
            snake.move();
        }
    } else {
        alert("Game Over");
        noLoop();
    }
    snake.handleControls();
    fill(0, 255, 0);
    rect(food.x, food.y, 25, 25);
    if (snake.eatFood(food)) {
        food = generateRandomFood();
    }
}