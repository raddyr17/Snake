class Snake {

    constructor(x, y) {
        this.body = [new BodySegment(x, y, createVector(1, 0))]
        this.color = "rgb(128,0,0)"
        this.head = this.body[0]
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].draw();
        }
    }

    push() {
        const tail = this.body[this.body.length - 1]
        if (this.head.v.x === 1) {
            this.body.push(new BodySegment(tail.x + 25, tail.y, this.head.v))
        } else if (this.head.v.x === -1) {
            this.body.push(new BodySegment(tail.x + 25, tail.y, this.head.v))
        } else if (this.head.v.y === 1) {
            this.body.push(new BodySegment(tail.x, tail.y + 25, this.head.v))
        } else if (this.head.v.y === -1) {
            this.body.push(new BodySegment(tail.x, tail.y + 25, this.head.v))
        }
    }


    move() {
        if (this.body.length === 1) {

            this.head.x += this.head.v.x * 25
            this.head.y += this.head.v.y * 25
        } else {
            for (let i = 0; i < this.body.length; i++) {

                const bodyFragment = this.body[i];
                bodyFragment.x += this.body[i - 1] * 25
                bodyFragment.y += this.body[i - 1] * 25
            }
        }

        if (keyIsDown(LEFT_ARROW) && this.head.v.x !== 1) {
            this.head.v.x = -1
            this.head.v.y = 0
        } else if (keyIsDown(RIGHT_ARROW) && this.head.v.x !== -1) {
            this.head.v.x = 1
            this.head.v.y = 0
        } else if (keyIsDown(UP_ARROW) && this.head.v.y !== 1) {
            this.head.v.x = 0
            this.head.v.y = -1
        } else if (keyIsDown(DOWN_ARROW) && this.head.v.y !== -1) {
            this.head.v.x = 0
            this.head.v.y = 1
        }
    }

    isNotColliding(bodyFragment) {
        return ((bodyFragment.x <= WIDTH - 25 && bodyFragment.x >= 10) && (bodyFragment.y <= HEIGHT && bodyFragment.y >= 25));
    }

    eatFood(food) {
        if (food.x === this.head.x && this.head.y === food.y) {
            this.push()
            return true
        }
        return false
    }
}