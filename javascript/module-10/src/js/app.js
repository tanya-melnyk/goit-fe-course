import { PRIORITY_TYPES, PRIORITY_NAMES } from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
import { createListItem, renderNoteList } from './view';

const shortid = require('shortid');

const notepad = new Notepad(initialNotes);

const refs = {
  searchForm: document.querySelector('.search-form'),
  noteEditorForm: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
};

renderNoteList(refs.noteList, notepad.notes);

////// функционал для добавления заметки пользователем ////////////

// рендерит новую карточку с заметкой
const addListItem = (listRef, note) => {
  const elem = createListItem(note);
  listRef.append(elem);
};

// создает новый объект с заметкой
const createNote = (titleInput, bodyInput) => {
  const note = {};
  note.id = shortid.generate();
  note.title = titleInput;
  note.body = bodyInput;
  note.priority = PRIORITY_TYPES.LOW;
  return note;
};

const handleSubmit = e => {
  e.preventDefault();

  const form = e.currentTarget;
  const { elements } = form;

  const titleInput = elements.note_title.value;
  const bodyInput = elements.note_body.value;

  if (!titleInput || !bodyInput) {
    alert('Необходимо заполнить все поля!');
    return;
  }

  const newNote = createNote(titleInput, bodyInput);
  notepad.saveNote(newNote);

  const noteList = document.querySelector('.note-list');
  addListItem(noteList, newNote);

  form.reset();
};

////// функционал для изменения приоритета заметки пользователем ////////////

const renderUpdatedNotes = (noteItem, itemId, priority) => {
  const notePriorityInfo = noteItem.querySelector('.note__priority');
  notepad.updateNotePriority(itemId, priority);
  const sortedNotes = notepad.sortNotesByPriority();

  [...refs.noteList.children].forEach(child => child.remove());
  renderNoteList(refs.noteList, sortedNotes);

  notePriorityInfo.textContent = `Priority: ${PRIORITY_NAMES[priority]}`;
};

const decreaseNotePriority = (noteItem, itemId) => {
  const note = notepad.findNoteById(itemId);

  if (note.priority === PRIORITY_TYPES.LOW) return;

  let priority = PRIORITY_TYPES.LOW;

  if (note.priority === PRIORITY_TYPES.HIGH) {
    priority = PRIORITY_TYPES.NORMAL;
  }

  renderUpdatedNotes(noteItem, itemId, priority);
};

const increaseNotePriority = (noteItem, itemId) => {
  const note = notepad.findNoteById(itemId);

  if (note.priority === PRIORITY_TYPES.HIGH) return;

  let priority = PRIORITY_TYPES.HIGH;

  if (note.priority === PRIORITY_TYPES.LOW) {
    priority = PRIORITY_TYPES.NORMAL;
  }

  renderUpdatedNotes(noteItem, itemId, priority);
};

////// функционал для редактирования заметки пользователем ////////////

const editNote = (noteItem, itemId) => {
  const note = notepad.findNoteById(itemId);
  const updatedContent = {};
  // notepad.updateNoteContent(itemId, updatedContent)
};

////// функционал для удаления заметки пользователем ////////////

const removeListItem = (noteItem, itemId) => {
  notepad.deleteNote(itemId);
  noteItem.remove();
};

// слушатель событий
const handleClick = e => {
  const targetBtn = e.target.parentNode;
  const action = targetBtn.dataset.action;
  const noteItem = targetBtn.closest('.note-list__item');
  const itemId = noteItem.dataset.id;

  switch (action) {
    case 'decrease-priority':
      decreaseNotePriority(noteItem, itemId);
      break;
    case 'increase-priority':
      increaseNotePriority(noteItem, itemId);
      break;
    case 'edit-note':
      editNote(noteItem, itemId);
      break;
    case 'delete-note':
      removeListItem(noteItem, itemId);
      break;
  }
};

////// функционал для фильтрации заметок пользователем ////////////

const handleSearchInput = e => {
  [...refs.noteList.children].forEach(child => child.remove());

  const input = e.target;
  const filteredNotes = notepad.filterNotesByQuery(input.value);
  renderNoteList(refs.noteList, filteredNotes);
};

export { refs, handleSubmit, handleClick, handleSearchInput };
