import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

const notesNode = '/notes/';
const userIdField = 'userId';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public fireDB: AngularFireDatabase) { }

  public getNotes(userId) {
    return this.fireDB.list(notesNode, ref => ref.orderByChild(userIdField).equalTo(userId));
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
