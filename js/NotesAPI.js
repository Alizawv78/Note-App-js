const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updated: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "second note",
    body: "some dummy text second",
    updated: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is third note",
    updated: "2021-11-01T10:47:26.889Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    // 1. existed or 2. not
    const notes = NotesAPI.getAllNotes();

    const existedNote = notes.find((n) => n.id == noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
