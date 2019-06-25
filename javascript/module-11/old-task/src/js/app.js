import {
  PRIORITY_TYPES,
  PRIORITY_NAMES,
  NOTIFICATION_MESSAGES,
} from './utils/constants';
import Notepad from './notepad-model';
import initialNotes from '../assets/notes.json';
// import { createListItem, renderNoteList } from './view';
import notesMarkup from '../templates/notes.hbs';
import MicroModal from 'micromodal';
import { Notyf } from 'notyf';

MicroModal.init();

const shortid = require('shortid');
const notyf = new Notyf();
const notepad = new Notepad(initialNotes);

const refs = {
  searchForm: document.querySelector('.search-form'),
  noteEditorForm: document.querySelector('.note-editor'),
  noteEditorForm2: document.querySelector('.note-editor-2'),
  noteList: document.querySelector('.note-list'),
  openModalBtn: document.querySelector('button[data-action="open-editor"]'),
};

const noteListMarkup = notes => notes.map(note => notesMarkup(note)).join('');

refs.noteList.innerHTML = noteListMarkup(initialNotes);

////// функционал для добавления заметки пользователем ////////////

// рендерит новую карточку с заметкой
// const addListItem = (listRef, note) => {
//   const elem = notesMarkup(note);
//   listRef.innerHTML = elem;
// };

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
    notyf.error(NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }

  const newNote = createNote(titleInput, bodyInput);
  notepad.saveNote(newNote);

  refs.noteList.innerHTML = noteListMarkup(notepad.notes);

  notyf.success(`Новая заметка "${titleInput}" создана!`);

  form.reset();
};

////// функционал для изменения приоритета заметки пользователем ////////////

const renderUpdatedNotes = (noteItem, itemId, priority) => {
  const notePriorityInfo = noteItem.querySelector('.note__priority');
  notepad.updateNotePriority(itemId, priority);
  const sortedNotes = notepad.sortNotesByPriority();

  [...refs.noteList.children].forEach(child => child.remove());
  refs.noteList.innerHTML = noteListMarkup(sortedNotes);

  notePriorityInfo.textContent = `Priority: ${priority}`;
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
  MicroModal.show('note-editor-modal-2');
  refs.noteEditorForm2.accessKey = itemId;
  const note = notepad.findNoteById(itemId);
  const { elements } = refs.noteEditorForm2;
  const titleInput = elements.note_title;
  titleInput.value = note.title;
  const bodyInput = elements.note_body;
  bodyInput.value = note.body;

  refs.noteEditorForm2.addEventListener('submit', handleEditSubmit);
};

function handleEditSubmit(e) {
  e.preventDefault();
  console.log(e.target);
  const form = e.currentTarget;
  console.log(form);
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

  const updateNote = notepad.updateNoteContent(itemId, updatedContent);

  refs.noteList.innerHTML = noteListMarkup(notepad.notes);

  notyf.success(`Заметка "${titleInput}" успешно изменена!`);

  form.reset();
}

////// функционал для удаления заметки пользователем ////////////

const removeListItem = (noteItem, itemId) => {
  const noteTitle = notepad.findNoteById(itemId).title;
  notyf.success(`Заметка "${noteTitle}" удалена!`);
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
  refs.noteList.innerHTML = noteListMarkup(filteredNotes);
};

const handleAddClick = e => {
  refs.noteEditorForm.addEventListener('submit', handleSubmit);
};

// слушатели событий

refs.noteList.addEventListener('click', handleClick);
refs.searchForm.addEventListener('input', handleSearchInput);
refs.openModalBtn.addEventListener('click', handleAddClick);

export { refs, handleSubmit, handleClick, handleSearchInput };
