class Snake {

    constructor(x, y) {
        this.body = [new BodySegment(x, y, createVector(1, 0))];
        this.color = "rgb(128,0,0)";
        this.head = this.body[0];
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].draw();
        }
    }

    elongate() {
        this.body.push(new BodySegment(0, 0, 0));

        const tail = this.body[this.body.length - 1];
        const oldTail = this.body[this.body.length - 2];

        console.log('tail: ' + tail);
        console.log('oldTail: ' + oldTail);

        if (oldTail.v.x === 1) {
            tail.x = oldTail.x - 25;
            tail.y = oldTail.y;
            tail.v = oldTail.v;
        } else if (oldTail.v.x === -1) {
            tail.x = oldTail.x + 25;
            tail.y = oldTail.y;
            tail.v = oldTail.v;
        } else if (oldTail.v.y === 1) {
            tail.x = oldTail.x;
            tail.y = oldTail.y - 25;
            tail.v = oldTail.v;
        } else if (oldTail.v.y === -1) {
            tail.x = oldTail.x;
            tail.y = oldTail.y + 25;
            tail.v = oldTail.v;
        }
    }


    move() {
        for (let i = 0; i < this.body.length; i++) {
            if (i === 0) {
                this.head.x += this.head.v.x * 25;
                this.head.y += this.head.v.y * 25;
                continue;
            }
            const bodyFragment = this.body[i];
            bodyFragment.x += this.body[i - 1].v.x * 25
            bodyFragment.y += this.body[i - 1].v.y * 25
        }
    }

    handleControls = () => {
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

    isNotColliding() {
        return ((this.head.x <= WIDTH - this.head.w && this.head.x >= 0) && (this.head.y >= 0 && this.head.y < HEIGHT));
    }

    eatFood(food) {
        if (food.x === this.head.x && this.head.y === food.y) {
            this.elongate();
            return true;
        }
        return false;
    }
}