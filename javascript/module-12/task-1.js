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
  constructor(elem, colors) {
    this.elem = elem;
    this.colors = colors;
    this.isActive = false;
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const min = 0;
      const max = this.colors.length - 1;
      const randomIdx = this.randomIntegerFromInterval(min, max);
      
      this.elem.style.backgroundColor = this.colors[randomIdx];
    }, 1000);
  }

  randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
}

const randomBodyBgColor = new RandomBgColor(refs.body, colors);

refs.startBtn.addEventListener(
  'click',
  randomBodyBgColor.start.bind(randomBodyBgColor),
);

refs.stopBtn.addEventListener(
  'click',
  randomBodyBgColor.stop.bind(randomBodyBgColor),
);
