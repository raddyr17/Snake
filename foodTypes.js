const FOOD_TYPES = [
    {
        name: 'NORMAL',
        color: 'rgb(0, 255, 0)',
        impactFunction: (snake) => {
            console.log("I ate normal food");
        }
    },
    {
        name: 'FAT',
        color: 'rgb(255, 255, 0)',
        impactFunction: () => {
            shrinkWindow();
            console.log("I ate fat food");
        }
    },
    {
        name: 'FAST',
        color: 'rgb(0, 0, 255)',
        impactFunction: (snake) => {
            TIMERS.speed.startT = getCurrentSeconds();
            TIMERS.speed.endT = TIMERS.speed.startT + TIMERS.speed.duration;

            snake.speed = SPEED.FAST;
            console.log("I ate quick food");
        }
    },
    {
        name: 'SLOW',
        color: 'rgb(0, 255, 255)',
        impactFunction: (snake) => {
            TIMERS.slow.startT = getCurrentSeconds();
            TIMERS.slow.endT = TIMERS.slow.startT + TIMERS.slow.duration;

            snake.speed = SPEED.SLOW;
            console.log("I ate slow food");
        }
    },
    {
        name: 'DOUBLE',
        color: 'rgb(255, 255, 255)',
        impactFunction: async (snake) => {
            const currentBodyLength = snake.body.length;
            for (let i = 0; i < currentBodyLength; i++) {
                await setTimeout(snake.elongate(), 1000);
            }
        }
    }
]

const shrinkWindow = () => {
    WINDOW_SIZE -= 1;
    HEIGHT = (WIDTH = WINDOW_SIZE * SNAKE_SIZE);
    resizeCanvas(HEIGHT, WIDTH);
}