export default class Notepad {
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
