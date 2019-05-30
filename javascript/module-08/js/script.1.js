'use strict';

class Quiz {
  constructor({ title, questions }) {
    this._title = title;
    this._questions = questions;
  }

  get questions() {
    return this._questions;
  }

  // Создает заголовок теста
  createQuizTitle() {
    const formTitle = document.createElement('h2');
    formTitle.textContent = this._title;
    return formTitle;
  }

  // Создает одну li с одним ответом
  createChoiceItem(choice, choiceIdx, questionIdx) {
    const choiceItem = document.createElement('li');
    const label = document.createElement('label');

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', `question-${questionIdx + 1}`);
    input.setAttribute('value', `${choiceIdx}`);

    label.append(input, choice);
    choiceItem.appendChild(label);

    return choiceItem;
  }

  // Создает секцию с текстом вопроса и списком ol с ответами
  createQuizItem(questionData, questionIdx) {
    const quizItem = document.createElement('section');
    quizItem.classList.add('js-question');

    const question = document.createElement('h3');
    question.textContent = `${questionIdx + 1}. ${questionData.question}`;

    const choicesList = document.createElement('ol');
    const choices = questionData.choices.map((choice, choiceIdx) =>
      this.createChoiceItem(choice, choiceIdx, questionIdx),
    );

    choicesList.append(...choices);
    quizItem.append(question, choicesList);

    return quizItem;
  }

  // Создает список секций с вопросами
  createQuizItems() {
    return this._questions.map((question, i) =>
      this.createQuizItem(question, i),
    );
  }

  // создает всю разметку теста с заголовком и списком вопросов
  createQuizHTML() {
    return [this.createQuizTitle(), ...this.createQuizItems()];
  }

  // делает кнопку submit активной если все ответы выбраны
  countAnswers(e) {
    const form = e.currentTarget;

    // определяет общее количество вопросов
    const formElements = form.children;

    const questionCount = [...formElements].reduce(
      (sum, elem) => (elem.className === 'js-question' ? sum + 1 : sum),
      0,
    );

    // определяет общее количество ответов, выбранных пользователем
    const formData = new FormData(e.currentTarget);
    const userAnswers = {};

    formData.forEach((value, name) => {
      userAnswers[name] = value;
    });

    const userAnswersCount = Object.keys(userAnswers).length;

    // делает кнопку submit активной если все ответы выбраны
    const submitBtn = form.lastElementChild;
    if (userAnswersCount === questionCount) {
      submitBtn.removeAttribute('disabled');
    }
  }

  // закрашивает ответы в красный или зеленый цвет
  colorUserAnswers(allInputs) {
    const rightAnswers = this.questions.map(question => question.answer);
    let questionNumber = 0;

    allInputs.forEach(input => {
      const answerText = input.parentNode;

      answerText.classList.remove('bg-green');
      answerText.classList.remove('bg-red');

      if (input.checked) {
        if (Number(input.value) === rightAnswers[questionNumber]) {
          answerText.classList.add('bg-green');
          questionNumber += 1;
        } else {
          answerText.classList.add('bg-red');
          questionNumber += 1;
        }
      }
    });
  }

  // считает процент правильных ответов и выводит сообщение с результатом
  printResultText(userRightAnswersCount, userAnswers, resultText) {
    const rightAnswersPercentage = Math.round(
      (userRightAnswersCount / userAnswers.length) * 100,
    );

    let message = `${rightAnswersPercentage}% правильных ответов.`;

    if (rightAnswersPercentage < 80) {
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

  // считает количество правильных ответов,
  // закрашивает ответы в красный или зеленый цвет
  showTestResult(e) {
    e.preventDefault();

    // считает количество правильных ответов
    const rightAnswers = this.questions.map(question => question.answer);
    const formData = new FormData(e.currentTarget);
    const userAnswers = {};

    formData.forEach((value, name) => {
      userAnswers[name] = value;
    });

    const userAnswersArr = Object.values(userAnswers);

    const userRightAnswersCount = userAnswersArr.reduce((sum, answer, i) => {
      if (Number(answer) === rightAnswers[i]) {
        sum += 1;
      }
      return sum;
    }, 0);

    // закрашивает ответы в красный или зеленый цвет
    const form = e.currentTarget;
    const allInputs = Array.from(form.elements);
    this.colorUserAnswers(allInputs);

    // выводит результат теста
    const resultText = form.nextElementSibling;
    this.printResultText(userRightAnswersCount, userAnswersArr, resultText);
  }
}

import quizData from './quiz-data.js';

const quiz = new Quiz(quizData);
const quizHTML = quiz.createQuizHTML();

const form = document.querySelector('form');
form.prepend(...quizHTML);

form.addEventListener('change', quiz.countAnswers.bind(quiz));
form.addEventListener('submit', quiz.showTestResult.bind(quiz));

////////////////////////////////////////////////
// СОБЫТИЯ
////////////////////////////////////////////////
// const rightAnswers = quiz.questions.map(question => question.answer);

// // делает кнопку submit активной если все ответы выбраны
// const countAnswers = e => {
//   const form = e.currentTarget;

//   // определяет общее количество вопросов
//   const formElements = form.children;

//   const questionCount = [...formElements].reduce(
//     (sum, elem) => (elem.className === 'js-question' ? sum + 1 : sum),
//     0,
//   );

//   // определяет общее количество ответов, выбранных пользователем
//   const formData = new FormData(e.currentTarget);
//   const userAnswers = {};

//   formData.forEach((value, name) => {
//     userAnswers[name] = value;
//   });

//   const userAnswersCount = Object.keys(userAnswers).length;

//   // делает кнопку submit активной если все ответы выбраны
//   const submitBtn = form.lastElementChild;
//   if (userAnswersCount === questionCount) {
//     submitBtn.removeAttribute('disabled');
//   }
// };

// // закрашивает ответы в красный или зеленый цвет
// const colorUserAnswers = allInputs => {
//   let questionNumber = 0;

//   allInputs.forEach(input => {
//     const answerText = input.parentNode;

//     answerText.classList.remove('bg-green');
//     answerText.classList.remove('bg-red');

//     if (input.checked) {
//       if (Number(input.value) === rightAnswers[questionNumber]) {
//         answerText.classList.add('bg-green');
//         questionNumber += 1;
//       } else {
//         answerText.classList.add('bg-red');
//         questionNumber += 1;
//       }
//     }
//   });
// };

// // считает процент правильных ответов и выводит сообщение с результатом
// const printResultText = (userRightAnswersCount, userAnswers, resultText) => {
//   const rightAnswersPercentage = Math.round(
//     (userRightAnswersCount / userAnswers.length) * 100,
//   );

//   let message = `${rightAnswersPercentage}% правильных ответов.`;

//   if (rightAnswersPercentage < 80) {
//     message += ' Тест не пройден. Вам еще нужно подучиться :)';
//     resultText.classList.add('bg-red');
//   } else {
//     message += ' Поздравляем! Тест пройден. Похоже, вы усердно занимались! :)';
//     resultText.classList.add('bg-green');
//   }

//   resultText.textContent = message;
//   resultText.classList.remove('invisible');
// };

// // считает количество правильных ответов,
// // закрашивает ответы в красный или зеленый цвет
// const showTestResult = e => {
//   e.preventDefault();

//   // считает количество правильных ответов
//   const formData = new FormData(e.currentTarget);
//   const userAnswers = {};

//   formData.forEach((value, name) => {
//     userAnswers[name] = value;
//   });

//   const userAnswersArr = Object.values(userAnswers);

//   const userRightAnswersCount = userAnswersArr.reduce((sum, answer, i) => {
//     if (Number(answer) === rightAnswers[i]) {
//       sum += 1;
//     }
//     return sum;
//   }, 0);

//   // закрашивает ответы в красный или зеленый цвет
//   const form = e.currentTarget;
//   const allInputs = Array.from(form.elements);
//   colorUserAnswers(allInputs);

//   // выводит результат теста
//   const resultText = form.nextElementSibling;
//   printResultText(userRightAnswersCount, userAnswersArr, resultText);
// };

// form.addEventListener('change', countAnswers);
// form.addEventListener('submit', showTestResult);
