class Food {

    constructor() {
        const maxRange = Math.floor(WIDTH / SNAKE_SIZE);
        this.type = FOOD_TYPES[getRandomInt(0, FOOD_TYPES.length)];
        const shift = getShift(this.type);
        this.x = getRandomInt(0, maxRange) * SNAKE_SIZE - shift
        this.y = getRandomInt(0, maxRange) * SNAKE_SIZE - shift
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

const getShift = (type) => {
    return type.name === "FAT" ? SNAKE_SIZE : 0;
}