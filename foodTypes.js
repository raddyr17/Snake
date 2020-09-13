const FOOD_TYPES = [
    {
        color: 'rgb(0, 255, 0)',
        impactFunction: (snake) => {
            console.log("I ate normal food");
        }
    },
    {
        color: 'rgb(255, 255, 0)',
        impactFunction: (snake) => { //TBD 
            console.log("I ate fat food"); 
        }
    },
    {
        color: 'rgb(0, 0, 255)',
        impactFunction: (snake) => {
            snake.speed -= 1; //TODO poprawic!
            console.log("I ate quick food");
        }
    }
]