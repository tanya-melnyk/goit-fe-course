'use strict';

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
  input.setAttribute('name', `${questionIdx}`);
  input.setAttribute('value', `${choiceIdx}`);

  label.append(input, choice);
  choiceItem.appendChild(label);

  return choiceItem;
}

// Создает секцию с текстом вопроса и списком ol с ответами
function createQuizItem(questionData, questionIdx) {
  const quizItem = document.createElement('section');

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
