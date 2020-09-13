class Food {

    constructor() {
        this.x = getRandomInt(0, WIDTH / SNAKE_SIZE) * SNAKE_SIZE
        this.y = getRandomInt(0, WIDTH / SNAKE_SIZE) * SNAKE_SIZE
        this.type = FOOD_TYPES[getRandomInt(0, FOOD_TYPES.length)]; 
    }

    draw = () => {
        fill(this.type.color);
        rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE);
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}