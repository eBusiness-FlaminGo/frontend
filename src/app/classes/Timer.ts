export class Timer {
  private intervalId: any;
  private remainingTime: number;
  private readonly duration: number;
  private readonly callback: () => void;
  public isStopped: boolean;

  get timeLeft(): number {
    return this.remainingTime;
  }

  constructor(duration: number, callback: () => void = () => {
  }) {
    this.duration = duration;
    this.remainingTime = duration;
    this.callback = callback;
    this.isStopped = true;
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
    if (this.isStopped) return;
    console.log("Pausing timer");
    clearInterval(this.intervalId);
  }

  resume() {
    if (this.isStopped) return;
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

  removeTime(seconds: number): void {
    if (seconds <= 0) return;
    this.remainingTime = Math.max(0, this.remainingTime - seconds);

    if (this.remainingTime === 0 && !this.isStopped) {
      this.stop();
      this.callback();
    }
  }

  setTime(seconds: number): void {
    if (seconds < 0) return;
    this.remainingTime = seconds;
  }
}
