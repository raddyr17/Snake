const SPEED = {
  SLOW: 10,
  NORMAL: 8,
  FAST: 6,
};

const DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
};

class Snake {
  constructor(x, y) {
    this.body = [new BodySegment(x, y, createVector(1, 0))];
    this.head = this.body[0];
    this.speed = SPEED.NORMAL;
    this.borderLess = false;
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
        (this.head.x += this.head.v.x * SNAKE_SIZE),
        (this.head.y += this.head.v.y * SNAKE_SIZE),
        this.head.v
      );

      this.body.unshift(newHead);
      this.body.pop();
    }
  }

  handleControls = () => {
    //TODO poprawic buga z zawracaniem weza (jesli szybko wcisniesz 3 kierunki...)
    if (keyIsDown(UP_ARROW) && this.head.v.y !== 1) {
      this.head.v.x = 0;
      this.head.v.y = -1;
    } else if (keyIsDown(DOWN_ARROW) && this.head.v.y !== -1) {
      this.head.v.x = 0;
      this.head.v.y = 1;
    } else if (keyIsDown(RIGHT_ARROW) && this.head.v.x !== -1) {
      this.head.v.x = 1;
      this.head.v.y = 0;
    } else if (keyIsDown(LEFT_ARROW) && this.head.v.x !== 1) {
      this.head.v.x = -1;
      this.head.v.y = 0;
    }
  };

  isColliding() {
    let withBody = false;
    let collisionDirection = this.getCollisionDirection();

    console.log("borderLEss", this.borderLess);
    console.log("collisionDirection", collisionDirection);
    if (this.borderLess && !!collisionDirection) {
      switch (collisionDirection) {
        case DIRECTION.LEFT:
          this.head.x += WIDTH;
          console.log("LEFT: " + this.head.x);
          break;
        case DIRECTION.RIGHT:
          this.head.x -= WIDTH;
          console.log("RIGHT: " + this.head.x);
          break;
        case DIRECTION.TOP:
          this.head.y += HEIGHT;
          console.log("TOP: " + this.head.y);

          break;
        case DIRECTION.BOTTOM:
          this.head.y -= HEIGHT;
          console.log("BOTTOM: " + this.head.y);

          break;
      }
      return false;
    }

    for (let i = 1; i < this.body.length; i++) {
      if (
        this.head.x + SNAKE_SIZE > this.body[i].x &&
        this.head.x < this.body[i].x + SNAKE_SIZE &&
        this.head.y + SNAKE_SIZE > this.body[i].y &&
        this.head.y < this.body[i].y + SNAKE_SIZE
      ) {
        withBody = true;
        break;
      }
    }

    return !!collisionDirection || withBody;
  }

  eatFood(food) {
    if (food.x === this.head.x && this.head.y === food.y) {
      setTimeout(food.type.impactFunction(this), 1000);
      this.elongate();
      return true;
    }
    return false;
  }

  updateSnakeEffects = () => {
    if (TIMERS.speed.isDone()) {
      snake.speed = SPEED.NORMAL;
      TIMERS.speed.reset();
      console.log("FAST reseted");
    } else if (TIMERS.slow.isDone()) {
      snake.speed = SPEED.NORMAL;
      TIMERS.slow.reset();
      console.log("SLOW reseted");
    } else if (TIMERS.tunel.isDone()) {
      snake.borderLess = false;
      TIMERS.tunel.reset();
      console.log("TUNEL reseted");
    }
  };

  collideWithRight = () => {
    return this.head.x > WIDTH - SNAKE_SIZE;
  };

  collideWithLeft = () => {
    return this.head.x < 0;
  };

  collideWithTop = () => {
    return this.head.y < 0;
  };

  collideWithBottom = () => {
    return this.head.y > HEIGHT - SNAKE_SIZE;
  };

  getCollisionDirection = () => {
    if (this.collideWithBottom()) {
      return DIRECTION.BOTTOM;
    } else if (this.collideWithTop()) {
      return DIRECTION.TOP;
    } else if (this.collideWithLeft()) {
      return DIRECTION.LEFT;
    } else if (this.collideWithRight()) {
      return DIRECTION.RIGHT;
    }
  };
}
