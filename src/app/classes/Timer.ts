export class Timer {
  private intervalId: any;
  private remainingTime: number;
  private readonly duration: number;
  private callback: () => void;

  get timeLeft(): number {
    return this.remainingTime;
  }

  constructor(duration: number, callback: () => void = () => {
  }) {
    this.duration = duration; // Total duration in seconds
    this.remainingTime = duration;
    this.callback = callback;
  }

  start() {
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.stop();
        this.callback();
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalId);
  }

  resume() {
    this.start();
  }

  stop() {
    clearInterval(this.intervalId);
    this.remainingTime = this.duration;
  }
}
