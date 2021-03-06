'use strict';

import {
  PRIORITY_TYPES,
  PRIORITY_NAMES,
  NOTIFICATION_MESSAGES,
  NOTE_ACTIONS,
} from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
import notesMarkup from '../templates/notes.hbs';
import { Notyf } from 'notyf';
import MicroModal from 'micromodal';
MicroModal.init();

const notyf = new Notyf();
const shortid = require('shortid');
const notepad = new Notepad(initialNotes);

const refs = {
  searchForm: document.querySelector('.search-form'),
  noteEditorForm: document.querySelector('.note-editor'),
  noteEditorForm2: document.querySelector('.note-editor-2'),
  noteList: document.querySelector('.note-list'),
  openModalBtn: document.querySelector('button[data-action="open-editor"]'),
};

////// СОЗДАНИЕ РАЗМЕТКИ ПО ШАБЛОНУ ////////////////

const noteListMarkup = notes => notes.map(note => notesMarkup(note)).join('');
refs.noteList.innerHTML = noteListMarkup(initialNotes);
renderPriorityNames();

// рендерим названия приоритета

function renderPriorityNames() {
  const priorityElems = document.querySelectorAll('.note__priority');
  [...priorityElems].map(elem => renderPriority(elem));
}

function renderPriority(elem) {
  const priority = elem.dataset.priority;
  elem.textContent = `Priority: ${PRIORITY_NAMES[priority]}`;
}

////// ДОБАВЛЕНИЕ НОВОЙ ЗАМЕТКИ ////////////

refs.noteEditorForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const { elements } = form;

  const titleInput = elements.note_title.value;
  const bodyInput = elements.note_body.value;

  if (!titleInput || !bodyInput) {
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }

  const newNote = createNote(titleInput, bodyInput);
  notepad.saveNote(newNote);

  refs.noteList.innerHTML = noteListMarkup(notepad.notes);
  renderPriorityNames();

  notyf.success(`Новая заметка "${titleInput}" создана!`);

  form.reset();
}

// создает новый объект с заметкой
function createNote(titleInput, bodyInput) {
  const note = {};
  note.id = shortid.generate();
  note.title = titleInput;
  note.body = bodyInput;
  note.priority = PRIORITY_TYPES.LOW;
  return note;
}

////// ПОИСК ЗАМЕТОК ПО СОДЕРЖИМОМУ ////////////

refs.searchForm.addEventListener('input', handleSearchInput);

function handleSearchInput(e) {
  const input = e.target;
  const filteredNotes = notepad.filterNotesByQuery(input.value);

  refs.noteList.innerHTML = noteListMarkup(filteredNotes);
  renderPriorityNames();
}

////// РЕДАКТИРОВАНИЕ ЗАМЕТОК ////////////

refs.noteList.addEventListener('click', handleClick);

// обработчик событий на карточке заметки
function handleClick(e) {
  const targetBtn = e.target.parentNode;
  const noteItem = targetBtn.closest('.note-list__item');

  // Снятие выделения предыдущей активной заметки
  const notes = refs.noteList.querySelectorAll('.note');
  [...notes].forEach(note => {
    note.classList.remove('active');
  });

  if (targetBtn.classList.contains('container')) return;

  // Выделение активной заметки
  const noteDiv = noteItem.querySelector('.note');
  noteDiv.classList.add('active');

  const action = targetBtn.dataset.action;
  const itemId = noteItem.dataset.id;

  switch (action) {
    case NOTE_ACTIONS.DECREASE_PRIORITY:
      decreaseNotePriority(noteItem, itemId);
      break;
    case NOTE_ACTIONS.INCREASE_PRIORITY:
      increaseNotePriority(noteItem, itemId);
      break;
    case NOTE_ACTIONS.EDIT:
      editNote(itemId);
      break;
    case NOTE_ACTIONS.DELETE:
      removeListItem(noteItem, itemId);
      break;
  }
}

////// Изменение приоритета заметки ////////////

function increaseNotePriority(noteItem, itemId) {
  const note = notepad.findNoteById(itemId);

  if (note.priority === PRIORITY_TYPES.HIGH) return;

  note.priority += 1;

  renderUpdatedNotes(noteItem, itemId, note.priority);
}

function decreaseNotePriority(noteItem, itemId) {
  const note = notepad.findNoteById(itemId);

  if (note.priority === PRIORITY_TYPES.LOW) return;

  note.priority -= 1;

  renderUpdatedNotes(noteItem, itemId, note.priority);
}

function renderUpdatedNotes(noteItem, itemId, priority) {
  const notePriorityInfo = noteItem.querySelector('.note__priority');
  notePriorityInfo.dataset.priority = priority;

  const sortedNotes = notepad.sortNotesByPriority();
  refs.noteList.innerHTML = noteListMarkup(sortedNotes);
  renderPriorityNames();

  // Выделение активной заметки
  const note = document.querySelector(`li[data-id="${itemId}"]`);
  const noteDiv = note.querySelector('.note');
  noteDiv.classList.add('active');
}

////// Редактирования содержимого заметки ////////////

function editNote(itemId) {
  MicroModal.show('note-editor-modal-2');

  refs.noteEditorForm2.accessKey = itemId;

  const { elements } = refs.noteEditorForm2;
  const note = notepad.findNoteById(itemId);

  const titleInput = elements.note_title;
  titleInput.value = note.title;

  const bodyInput = elements.note_body;
  bodyInput.value = note.body;

  refs.noteEditorForm2.addEventListener('submit', handleEditSubmit);
}

function handleEditSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const itemId = form.accessKey;
  const { elements } = form;

  const titleInput = elements.note_title.value;
  const bodyInput = elements.note_body.value;

  if (!titleInput || !bodyInput) {
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }

  const updatedContent = {
    title: titleInput,
    body: bodyInput,
  };

  notepad.updateNoteContent(itemId, updatedContent);
  refs.noteList.innerHTML = noteListMarkup(notepad.notes);
  renderPriorityNames();

  notyf.success(`Заметка "${titleInput}" успешно изменена!`);
}

////// Удаление заметки ////////////

function removeListItem(noteItem, itemId) {
  const noteTitle = notepad.findNoteById(itemId).title;
  notyf.success(`Заметка "${noteTitle}" удалена!`);

  notepad.deleteNote(itemId);
  noteItem.remove();
}
