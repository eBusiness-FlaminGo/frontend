export class Timer {
  private intervalId: any;
  remainingTime: number;
  private readonly duration: number;
  private readonly callback: () => void;
  public isStopped: boolean;
  public isPaused: boolean;

  get timeLeft(): number {
    return this.remainingTime;
  }

  constructor(duration: number, callback: () => void = () => {
  }) {
    this.duration = duration;
    this.remainingTime = duration;
    this.callback = callback;
    this.isStopped = true;
    this.isPaused = false;
  }

  start(isResume: boolean = false) {
    if (!this.isStopped && !isResume) return;
    this.isStopped = false;
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
    if (this.isStopped || this.isPaused) return;
    this.isPaused = true;
    clearInterval(this.intervalId);
  }

  resume() {
    if (this.isStopped || !this.isPaused) return;
    this.isPaused = false;
    this.start(true);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isStopped = true;
    this.remainingTime = this.duration;
  }

  addTime(seconds: number): void {
    if (seconds <= 0) return;
    this.remainingTime += seconds;
  }
}
