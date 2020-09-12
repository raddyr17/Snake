class BodySegment {
    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;
        this.v = createVector(v.x, v.y)
    }

    draw() {
        fill("rgb(128,0,0)")
        rect(this.x, this.y, this.w, this.h)
        rectMode(CORNER)
    }
}