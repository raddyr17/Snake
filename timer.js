class Timer { //TODO poprawic
    constructor(duration) {
        this.startT = undefined;
        this.duration = duration;
        this.endT = undefined;
    }
}

const TIMERS = {
    speed: new Timer(2),
    slow: new Timer(2),
}

const getCurrentSeconds = () => {
    return millis() / 1000;
}