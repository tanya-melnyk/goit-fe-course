'use strict';

// HTML-разметка для вопросов с ответами
{
  /* <section>
  <h3>1. Текст вопроса</h3>

  <ol>
    <li>
      <label>
        <input type="radio" name="question-0" value="0" />
        Ответ 1
      </label>
    </li>
    <li>
      <label>
        <input type="radio" name="0" value="1" />
        Ответ 2
      </label>
    </li>
  </ol>
</section> */
}

import quizData from './quiz-data.js';

const form = document.querySelector('form');
const submitBtn = document.querySelector('button[type="submit"]');
const formTitle = document.createElement('h2');
formTitle.textContent = quizData.title;
form.insertBefore(formTitle, submitBtn);

// Создает одну li с одним ответом
function createChoiceItem(choice, choiceIdx, questionIdx) {
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
function createQuizItem(questionData, questionIdx) {
  const quizItem = document.createElement('section');
  quizItem.classList.add('js-question');

  const question = document.createElement('h3');
  question.textContent = `${questionIdx + 1}. ${questionData.question}`;

  const choicesList = document.createElement('ol');
  const choices = questionData.choices.map((choice, choiceIdx) =>
    createChoiceItem(choice, choiceIdx, questionIdx),
  );

  choicesList.append(...choices);
  quizItem.append(question, choicesList);

  return quizItem;
}

// Создает список секций с вопросами
function createQuizItems(quizData) {
  return quizData.questions.map((question, i) => createQuizItem(question, i));
}

const quizItems = createQuizItems(quizData);

submitBtn.before(...quizItems);

// СОБЫТИЯ

const rigthAnswers = quizData.questions.map(item => item.answer);

// делает кнопку submit активной если все ответы выбраны
const countAnswers = e => {
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
  if (userAnswersCount === questionCount) {
    submitBtn.removeAttribute('disabled');
  }
};

// закрашивает ответы в красный или зеленый цвет
const colorUserAnswers = allInputs => {
  let questionNumber = 0;

  allInputs.forEach(input => {
    const answerText = input.parentNode;

    answerText.classList.remove('bg-green');
    answerText.classList.remove('bg-red');

    if (input.checked) {
      if (Number(input.value) === rigthAnswers[questionNumber]) {
        answerText.classList.add('bg-green');
        questionNumber += 1;
      } else {
        answerText.classList.add('bg-red');
        questionNumber += 1;
      }
    }
  });
};

// считает процент правильных ответов и выводит сообщение с результатом
const printResultText = (userRigthAnswersCount, userAnswers, resultText) => {
  const rigthAnswersPercentage = Math.round(
    (userRigthAnswersCount / userAnswers.length) * 100,
  );

  let message = `${rigthAnswersPercentage}% правильных ответов.`;

  if (rigthAnswersPercentage < 80) {
    message += ' Тест не пройден.';
    resultText.classList.add('bg-red');
  } else {
    message += ' Поздравляем! Тест пройден.';
    resultText.classList.add('bg-green');
  }

  resultText.textContent = message;
  resultText.classList.remove('invisible');
};

// считает количество правильных ответов,
// закрашивает ответы в красный или зеленый цвет
const showTestResult = e => {
  e.preventDefault();

  // считает количество правильных ответов
  const formData = new FormData(e.currentTarget);
  const userAnswers = {};

  formData.forEach((value, name) => {
    userAnswers[name] = value;
  });

  const userAnswersArr = Object.values(userAnswers);

  const userRigthAnswersCount = userAnswersArr.reduce((sum, answer, i) => {
    if (Number(answer) === rigthAnswers[i]) {
      sum += 1;
    }
    return sum;
  }, 0);

  // закрашивает ответы в красный или зеленый цвет
  const form = e.currentTarget;
  const allInputs = Array.from(form.elements);
  colorUserAnswers(allInputs);

  // выводит результат теста
  const resultText = form.nextElementSibling;
  printResultText(userRigthAnswersCount, userAnswersArr, resultText);
};

form.addEventListener('change', countAnswers);
form.addEventListener('submit', showTestResult);

////////////////////////////////////////////////////////////////////////
// Version 1

// const userAnswers = [];
// const rigthAnswers = quizData.questions.map(item => item.answer);

// // записывает выбранные ответы в массив
// // и делает кнопку submit активной если все ответы выбраны
// const saveAnswer = e => {
//   const userAnswer = e.target;
//   const answerIdx = Number(userAnswer.name);
//   userAnswers[answerIdx] = userAnswer;

//   if (userAnswers.length === quizData.questions.length) {
//     submitBtn.removeAttribute('disabled');
//   }
// };

// // считает процент правильных ответов и выводит сообщение с результатом
// const printResultText = (userRigthAnswersCount, resultText) => {
//   const rigthAnswersPercentage = Math.round(
//     (userRigthAnswersCount / rigthAnswers.length) * 100,
//   );

//   let message = `${rigthAnswersPercentage}% правильных ответов.`;

//   if (rigthAnswersPercentage < 80) {
//     message += ' Тест не пройден.';
//     resultText.classList.add('bg-red');
//   } else {
//     message += ' Поздравляем! Тест пройден.';
//     resultText.classList.add('bg-green');
//   }

//   resultText.textContent = message;
//   resultText.classList.remove('invisible');
// };

// // считает количество правильных ответов, закрашивает ответы в красный или зеленый цвет,
// // делает кнопку submit и радио-кнопки неактивными после сабмита формы
// const showTestResult = e => {
//   e.preventDefault();

//   const userRigthAnswersCount = userAnswers.reduce((sum, answer, i) => {
//     const answerText = answer.parentNode;

//     if (Number(answer.value) === rigthAnswers[i]) {
//       sum += 1;
//       answerText.classList.add('bg-green');
//     } else {
//       answerText.classList.add('bg-red');
//     }
//     return sum;
//   }, 0);

//   const form = e.currentTarget;
//   const resultText = form.nextElementSibling;

//   printResultText(userRigthAnswersCount, resultText);

//   submitBtn.setAttribute('disabled', 'true');

//   const inputs = form.querySelectorAll('input');
//   [...inputs].forEach(input => input.setAttribute('disabled', 'true'));
// };

// form.addEventListener('change', saveAnswer);
// form.addEventListener('submit', showTestResult);
