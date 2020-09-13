class Snake {

    constructor(x, y) {
        this.body = [new BodySegment(x, y, createVector(1, 0))];
        this.head = this.body[0];
        this.speed = 8;
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

        if (oldTail.v.x === 1) {
            tail.x = oldTail.x - SNAKE_SIZE;
            tail.y = oldTail.y;
            tail.v = oldTail.v;
        } else if (oldTail.v.x === -1) {
            tail.x = oldTail.x + SNAKE_SIZE;
            tail.y = oldTail.y;
            tail.v = oldTail.v;
        } else if (oldTail.v.y === 1) {
            tail.x = oldTail.x;
            tail.y = oldTail.y - SNAKE_SIZE;
            tail.v = oldTail.v;
        } else if (oldTail.v.y === -1) {
            tail.x = oldTail.x;
            tail.y = oldTail.y + SNAKE_SIZE;
            tail.v = oldTail.v;
        }
    }


    move() {
        if (frameCount % this.speed === 0) {
            const newHead = new BodySegment(
                this.head.x += this.head.v.x * SNAKE_SIZE,
                this.head.y += this.head.v.y * SNAKE_SIZE,
                this.head.v
            );

            this.body.unshift(newHead);
            this.body.pop();
        }
    }

    handleControls = () => { //TODO poprawic buga z zawracaniem weza (jesli szybko wcisniesz 3 kierunki...)
        if (keyIsDown(UP_ARROW) && this.head.v.y !== 1) {
            this.head.v.x = 0
            this.head.v.y = -1
        } else if (keyIsDown(DOWN_ARROW) && this.head.v.y !== -1) {
            this.head.v.x = 0
            this.head.v.y = 1
        } else if (keyIsDown(RIGHT_ARROW) && this.head.v.x !== -1) {
            this.head.v.x = 1
            this.head.v.y = 0
        } else if (keyIsDown(LEFT_ARROW) && this.head.v.x !== 1) {
            this.head.v.x = -1
            this.head.v.y = 0
        }
    }

    isColliding() {
        let withBounds = this.head.x > WIDTH - SNAKE_SIZE || this.head.x < 0 
            || this.head.y < 0 || this.head.y > HEIGHT - SNAKE_SIZE;

        let withBody = false;

        for (let i = 1; i < this.body.length; i++) {
            if (this.head.x + SNAKE_SIZE > this.body[i].x 
                && this.head.x < this.body[i].x + SNAKE_SIZE
                && this.head.y + SNAKE_SIZE > this.body[i].y
                && this.head.y < this.body[i].y + SNAKE_SIZE) {
                withBody = true;
                break;
            }
        }

        return withBounds || withBody;
    }

    eatFood(food) {
        if (food.x === this.head.x && this.head.y === food.y) {
            food.type.impactFunction(this);
            this.elongate();
            return true;
        }
        return false;
    }
}