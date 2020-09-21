const FOOD_TYPES = [
  {
    name: "NORMAL",
    color: "rgb(0, 255, 0)",
    impactFunction: (snake) => {
      console.log("I ate normal food");
    },
  },
  {
    name: "FAT",
    color: "rgb(255, 255, 0)",
    impactFunction: () => {
      shrinkWindow();
      console.log("I ate fat food");
    },
  },
  {
    name: "FAST",
    color: "rgb(0, 0, 255)",
    impactFunction: (snake) => {
      TIMERS.speed.init();
      snake.speed = SPEED.FAST;
      console.log("I ate quick food");
    },
  },
  {
    name: "SLOW",
    color: "rgb(0, 255, 255)",
    impactFunction: (snake) => {
      TIMERS.slow.init();
      snake.speed = SPEED.SLOW;
      console.log("I ate slow food");
    },
  },
  {
    name: "DOUBLE",
    color: "rgb(255, 255, 255)",
    impactFunction: async (snake) => {
      for (let i = 0; i < 2; i++) {
        await setTimeout(snake.elongate(), 1000);
      }
    },
  },
  {
    name: "TUNEL",
    color: "rgb(173, 3, 252)",
    impactFunction: async (snake) => {
      TIMERS.tunel.init();
      snake.borderLess = true;
    },
  },
];

const shrinkWindow = () => {
  WINDOW_SIZE -= 1;
  HEIGHT = WIDTH = WINDOW_SIZE * SNAKE_SIZE;
  resizeCanvas(HEIGHT, WIDTH);
};
