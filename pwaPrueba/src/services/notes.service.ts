import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

const notesNode = '/notes/';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public fireDB: AngularFireDatabase) { }

  public getNotes() {
    return this.fireDB.list(notesNode);
  }

  public getNote(id) {
    return this.fireDB.object(notesNode + id);
  }

  public createNote(note) {
    return this.fireDB.database.ref(notesNode + note.id).set(note);
  }

  public editNote(note) {
    return this.fireDB.database.ref(notesNode + note.id).set(note);
  }

  public deleteNote(id) {
    return this.fireDB.database.ref(notesNode + id).remove();
  }
}
