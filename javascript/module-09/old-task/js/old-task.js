'use strict';

class Notepad {
  constructor(notes) {
    this._notes = notes;
    this.sortNotesByPriority();
  }

  get notes() {
    return this._notes;
  }

  findNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  saveNote(note) {
    this._notes = [...this._notes, note];
    return note;
  }

  deleteNote(id) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

  updateNoteContent(id, updatedContent) {
    this._notes = this._notes.map(note =>
      note.id === id ? { ...note, ...updatedContent } : note,
    );
    return this.findNoteById(id);
  }

  updateNotePriority(id, priority) {
    this._notes = this._notes.map(note =>
      note.id === id ? { ...note, priority } : note,
    );
    return this.findNoteById(id);
  }

  filterNotesByQuery(query) {
    query = query.toLowerCase();
    return this._notes.filter(
      note =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query),
    );
  }

  filterNotesByPriority(priority) {
    return this._notes.filter(note => note.priority === priority);
  }

  sortNotesByPriority() {
    return this._notes.sort((a, b) => b.priority - a.priority);
  }
}

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const PRIORITY_NAMES = ['Low', 'Normal', 'High'];

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

const notepad = new Notepad(initialNotes);

const createNoteContent = (title, body) => {
  const noteContent = document.createElement('div');
  noteContent.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  noteContent.append(noteTitle, noteBody);

  return noteContent;
};

const createActionButton = (action, iconName) => {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = action;

  const icon = document.createElement('i');
  icon.classList.add('material-icons', 'action__icon');
  icon.textContent = iconName;

  button.appendChild(icon);

  return button;
};

const createPrioritySection = priority => {
  const prioritySection = document.createElement('section');
  prioritySection.classList.add('note__section');

  const decreaseButton = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
  );
  const increaseButton = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP,
  );

  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');

  notePriority.textContent = `Priority: ${PRIORITY_NAMES[priority]}`;

  prioritySection.append(decreaseButton, increaseButton, notePriority);

  return prioritySection;
};

const createNoteFooter = priority => {
  const footer = document.createElement('footer');
  footer.classList.add('note__footer');

  const prioritySection = createPrioritySection(priority);

  const editSection = document.createElement('section');
  editSection.classList.add('note__section');

  const editButton = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);
  const deleteButton = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
  );

  editSection.append(editButton, deleteButton);

  footer.append(prioritySection, editSection);

  return footer;
};

const createListItem = ({ id, title, body, priority }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const noteContainer = document.createElement('div');
  noteContainer.classList.add('note');

  const noteContent = createNoteContent(title, body);
  const noteFooter = createNoteFooter(priority);

  noteContainer.append(noteContent, noteFooter);
  listItem.append(noteContainer);

  return listItem;
};

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(note => createListItem(note));
  listRef.append(...listItems);
};

const refs = {
  searchForm: document.querySelector('.search-form'),
  noteEditorForm: document.querySelector('.note-editor'),
  noteList: document.querySelector('.note-list'),
};

renderNoteList(refs.noteList, notepad.notes);

////// функционал для добавления заметки пользователем ////////////

const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

// рендерит новую карточку с заметкой
const addListItem = (listRef, note) => {
  const elem = createListItem(note);
  listRef.append(elem);
};

// создает новый объект с заметкой
const createNote = (titleInput, bodyInput) => {
  const note = {};
  note.id = generateUniqueId();
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

refs.noteEditorForm.addEventListener('submit', handleSubmit);

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

refs.noteList.addEventListener('click', handleClick);

////// функционал для фильтрации заметок пользователем ////////////

const handleSearchInput = e => {
  [...refs.noteList.children].forEach(child => child.remove());

  const input = e.target;
  const filteredNotes = notepad.filterNotesByQuery(input.value);
  renderNoteList(refs.noteList, filteredNotes);
};

refs.searchForm.addEventListener('input', handleSearchInput);
