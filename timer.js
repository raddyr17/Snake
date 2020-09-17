class Timer {
  constructor(duration) {
    this.startT = undefined;
    this.duration = duration;
    this.endT = undefined;
  }

  init = () => {
    this.startT = getCurrentSeconds();
    this.endT = this.startT + this.duration;
  };

  reset = () => {
    this.startT = 0;
    this.endT = 0;
  };

  isDone = () => {
      return !!this.endT && this.endT <= getCurrentSeconds()
  };
}

const TIMERS = {
  speed: new Timer(2),
  slow: new Timer(2),
  tunel: new Timer(5),
};

const getCurrentSeconds = () => {
  return millis() / 1000;
};
