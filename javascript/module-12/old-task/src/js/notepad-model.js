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
    return new Promise(resolve => {
      this._notes = [...this._notes, note];
      resolve(note);
    });
  }

  deleteNote(id) {
    return new Promise(resolve => {
      this._notes = this._notes.filter(note => note.id !== id);
      resolve(this._notes);
    });
  }

  updateNoteContent(id, updatedContent) {
    return new Promise(resolve => {
      this._notes = this._notes.map(note =>
        note.id === id ? { ...note, ...updatedContent } : note,
      );
      resolve(this._notes);
    });
  }

  updateNotePriority(id, priority) {
    return new Promise(resolve => {
      this._notes = this._notes.map(note =>
        note.id === id ? { ...note, priority } : note,
      );
      resolve(this.findNoteById(id));
    });
  }

  filterNotesByQuery(query) {
    return new Promise(resolve => {
      query = query.toLowerCase();
      resolve(
        this._notes.filter(
          note =>
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query),
        ),
      );
    });
  }

  filterNotesByPriority(priority) {
    return Promise.resolve(
      this._notes.filter(note => note.priority === priority),
    );
  }

  sortNotesByPriority() {
    return Promise.resolve(this._notes.sort((a, b) => b.priority - a.priority));
  }
}
