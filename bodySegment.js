let SNAKE_SIZE = 25;

class BodySegment {
    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.v = createVector(v.x, v.y)
    }

    draw() {
        fill("rgb(255, 0, 0)")
        rect(this.x, this.y, SNAKE_SIZE, SNAKE_SIZE)
        rectMode(CORNER)
    }
}