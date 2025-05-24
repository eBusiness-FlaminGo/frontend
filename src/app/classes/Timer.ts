class Timer {
  private intervalId: any;
  private remainingTime: number;
  private duration: number;

  constructor(duration: number) {
    this.duration = duration; // Total duration in seconds
    this.remainingTime = duration;
  }

  start() {
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        console.log(`Time left: ${this.remainingTime}s`);
      } else {
        this.stop();
        console.log('Timer finished');
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
    console.log('Timer paused');
  }

  resume() {
    this.start();
    console.log('Timer resumed');
  }

  stop() {
    clearInterval(this.intervalId);
    this.remainingTime = this.duration;
    console.log('Timer stopped');
  }
}
