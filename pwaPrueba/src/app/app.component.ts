import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotesService } from 'src/services/notes.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  panelOpenState = false;
  categories = ['Personal', 'Trabajo', 'Familiar'];
  note: any = {};
  notes: any = [];
  private readonly createdNote = 'Nota creada';
  private readonly deletedNote = 'Nota eliminada';

  constructor(private swUpdate: SwUpdate, private notesService: NotesService, private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.notesService.getNotes().valueChanges().subscribe(
      (notes) => {
        this.notes = notes;
        console.log(this.notes);
      }
    );
  }

  ngOnInit(): void {
    // Este método ayuda a que se actualice la versión del service worker de manera automática cuando se realicen actualizaciones
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }

  saveNote(note) {
    if (!note.id) {
      note.id = Date.now();
    }
    this.notesService.createNote(note).then(() => {
      this.note = {};
      this.openSnackbar(this.createdNote);
    });
  }

  private openSnackbar(message) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  editNote(note) {
    this.note = note;
  }

  deleteNote(id): void {
    this.notesService.deleteNote(id).then(() => {
      this.openSnackbar(this.deletedNote);
    });
  }
}
