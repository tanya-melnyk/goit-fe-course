'use strict';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timer = document.querySelector(selector);
    this.targetTime = targetDate.getTime();
    this.printTargetDate(targetDate);
    this.setTimer();
  }

  printTargetDate(targetDate) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    const elem = this.timer.querySelector('.js-target-date');
    const localeUk = targetDate.toLocaleString('en-US', options);
    elem.textContent = localeUk;
  }

  setTimer() {
    this.setCountDown();
    this.intervalId = setInterval(() => {
      this.setCountDown();
    }, 1000);
  }

  setCountDown() {
    const currentTime = Date.now();
    this.deltaTime = this.targetTime - currentTime;
    this.countTimeLeft(this.deltaTime);
  }

  countTimeLeft(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.printTimeLeft(days, hours, mins, secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  printTimeLeft(days, hours, mins, secs) {
    const daysSpan = this.timer.querySelector('span[data-value="days"]');
    const hoursSpan = this.timer.querySelector('span[data-value="hours"]');
    const minsSpan = this.timer.querySelector('span[data-value="mins"]');
    const secsSpan = this.timer.querySelector('span[data-value="secs"]');

    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minsSpan.textContent = mins;
    secsSpan.textContent = secs;

    // А если уверен в разметке, то можно и так:

    // const dateElems = this.timer.querySelectorAll('.value');
    // [...dateElems].forEach((elem, i) => {
    //   elem.textContent = arguments[i];
    // });
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 1, 2020'),
});
