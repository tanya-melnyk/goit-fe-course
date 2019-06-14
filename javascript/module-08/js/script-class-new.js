'use strict';

import jsQuizData from './quiz-data.js';

class Quiz {
  constructor({ title, questions }, elemSelector) {
    this.title = title;
    this.questions = questions;
    this.elemSelector = elemSelector;
    this.createQuiz();
  }

  // // Создает всю разметку теста с заголовком и списком вопросов
  buildQuizMarkup() {
    return (
      `<h2>${this.title}</h2>` +
      this.questions
        .map(
          (section, sectionIdx) =>
            `<section>
              <h3>${sectionIdx + 1}. ${section.question}</h3>
        
              <ol>
               ${section.choices
                 .map(
                   (choice, choiceIdx) =>
                     `<li>
                       <label>
                         <input type="radio" name="question-${sectionIdx}" value="${choiceIdx}" />
                         ${choice}
                       </label>
                     </li>`,
                 )
                 .join('')}
              </ol>

             </section>`,
        )
        .join('')
    );
  }

  //// рендерит разметку и вешает слушателей на форму
  createQuiz() {
    const quizForm = document.querySelector(this.elemSelector);
    quizForm.insertAdjacentHTML('afterbegin', this.buildQuizMarkup());

    quizForm.addEventListener('change', this.countAnswers.bind(this));
    quizForm.addEventListener('submit', this.showTestResult.bind(this));
  }

  //// делает кнопку submit активной если все ответы выбраны
  countAnswers(e) {
    const form = e.currentTarget;
    const submitBtn = form.lastElementChild;

    // определяет общее количество ответов, выбранных пользователем
    let userAnswersCount = 0;
    const formData = new FormData(form);

    formData.forEach(() => {
      userAnswersCount += 1;
    });

    // делает кнопку submit активной если все ответы выбраны
    if (userAnswersCount === this.questions.length) {
      submitBtn.disabled = false;
    }
  }

  //// при нажатии кнопки собирает ответы пользователей в масств объектов,
  //// определяет правильно ли ответил пользователь на каждый вопрос,
  //// закрашивает ответы в красный или зеленый цвет
  showTestResult(e) {
    e.preventDefault();

    // собирает ответы пользователей в масств объектов,
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userAnswers = [];

    formData.forEach((value, name) => {
      userAnswers.push({
        name,
        value: Number(value),
      });
    });

    // определяет правильно ли ответил пользователь на каждый вопрос
    const correctAnswers = this.questions.map(question => question.answer);
    
    const userCheckedAnswers = userAnswers.map((userAnswer, i) => ({
      ...userAnswer,
      correct: userAnswer.value === correctAnswers[i],
    }));

    // закрашивает ответы в красный или зеленый цвет
    this.colorUserAnswers(userCheckedAnswers, form);

    // // выводит результат теста
    const resultText = form.nextElementSibling;
    this.printResultText(userCheckedAnswers, resultText);
  }

  //// закрашивает ответы в красный или зеленый цвет
  colorUserAnswers(userCheckedAnswers, form) {
    // убирает предыдущее закрашивание
    [...form.elements].forEach(input => {
      const answerText = input.parentNode;

      answerText.classList.remove('bg-green');
      answerText.classList.remove('bg-red');
    });

    // закрашивает ответы
    userCheckedAnswers.forEach(answer => {
      const input = form.querySelector(
        `input[name="${answer.name}"][value="${answer.value}"]`,
      );

      const answerText = input.parentNode;
      answerText.classList.add(answer.correct ? 'bg-green' : 'bg-red');
    });
  }

  //// считает процент правильных ответов и выводит сообщение с результатом
  printResultText(userCheckedAnswers, resultText) {
    const userCorrectAnswersCount = userCheckedAnswers.reduce(
      (sum, answer) => (answer.correct ? sum + 1 : sum),
      0,
    );

    const correctAnswersPercentage = Math.round(
      (userCorrectAnswersCount / userCheckedAnswers.length) * 100,
    );

    let message = `${correctAnswersPercentage}% правильных ответов.`;

    if (correctAnswersPercentage < 80) {
      message += ' Тест не пройден. Вам еще нужно подучиться :)';
      resultText.classList.add('bg-red');
    } else {
      message +=
        ' Поздравляем! Тест пройден. Похоже, вы усердно занимались! :)';
      resultText.classList.add('bg-green');
    }

    resultText.textContent = message;
    resultText.classList.remove('invisible');
  }
}

new Quiz(jsQuizData, '.js-quiz-form');
