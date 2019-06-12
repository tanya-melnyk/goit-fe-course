import { PRIORITY_NAMES, ICON_TYPES, NOTE_ACTIONS } from './utils/constants';

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

export { createListItem, renderNoteList };
