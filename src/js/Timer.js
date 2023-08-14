import MatchGridHelper from './MatchGridHelper';

export default class Timer extends MatchGridHelper {
  constructor({ durationMinutes, onFinish }) {
    super('.list');
    this.durationMilliseconds = durationMinutes * 60 * 1000;
    this.timerID = null;
    this.finished = false;
    this.onFinish = onFinish;
    this.paused = false;
  }

  getRefs() {
    const minsValue = document.querySelector('span[data-value="mins"]');
    const secsValue = document.querySelector('span[data-value="secs"]');
    return { minsValue, secsValue };
  }

  getTime(time) {
    const mins = this.pad(Math.floor(time / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  startInterval({ minsValue, secsValue }) {
    if (!this.paused) {
      this.timerID = setInterval(() => {
        this.durationMilliseconds -= 1000;
        const timeResult = this.getTime(this.durationMilliseconds);
        minsValue.textContent = `${timeResult.mins} `;
        secsValue.textContent = `${timeResult.secs} `;

        if (this.durationMilliseconds < 0) {
          this.stopTimer();
          this.finished = true;
          if (this.onFinish && this.finished) {
            this.onFinish();
          }
        }
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.timerID);
    this.paused = true;
  }

  resumeTimer() {
    if (this.paused) {
      const { minsValue, secsValue } = this.getRefs();
      this.paused = false;
      this.startInterval({ minsValue, secsValue });
    }
  }
}
