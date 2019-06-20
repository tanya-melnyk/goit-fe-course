'use strict';

const refs = {
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
  body: document.querySelector('body'),
};

const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

class RandomBgColor {
  constructor(colors) {
    this.colors = colors;
    this.isActive = false;
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;

    this.intervalId = setInterval(
      elem => {
        const randomIdx = this.randomIntegerFromInterval(
          0,
          this.colors.length - 1,
        );

        elem.style.backgroundColor = this.colors[randomIdx];
      },
      1000,
      refs.body,
    );
  }

  randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

const randomBgColor = new RandomBgColor(colors);

refs.startBtn.addEventListener(
  'click',
  randomBgColor.start.bind(randomBgColor),
);

refs.stopBtn.addEventListener('click', randomBgColor.stop.bind(randomBgColor));
