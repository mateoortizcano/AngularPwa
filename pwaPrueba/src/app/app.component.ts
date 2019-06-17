import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NotesService } from 'src/services/notes.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AuthService } from 'src/services/auth.service';
import { MessagingService } from 'src/services/messaging.service';

const fiveSeconds = 5000;
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
  loggedIn = false;
  authUserId = {};
  message: any = {};

  constructor(private swUpdate: SwUpdate, private notesService: NotesService,
    private _snackBar: MatSnackBar, public dialog: MatDialog,
    private authService: AuthService, private messaging: MessagingService) {
    this.authService.isLoggued().subscribe((result) => {
      if (result && result.uid) {
        this.loggedIn = true;
        this.authUserId = result.uid;
        this.getNotes();
      } else {
        this.loggedIn = false;
      }
    }, (error) => {
      this.loggedIn = false;
    });
    this.pushNotification();
  }

  private pushNotification() {
    this.messaging.getPermission();
    this.messaging.receiveMessage();
    this.messaging.currentMessage.subscribe(message => {
      if (message != null) {
        this.openSnackbar(message.notification.body);
      }
    });
  }

  private getNotes() {
    this.notesService.getNotes(this.authUserId).valueChanges().subscribe((receivedNotes) => {
      this.notes = receivedNotes;
    });
  }

  ngOnInit(): void {
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
    note.userId = this.authUserId;
    this.notesService.createNote(note).then(() => {
      this.note = {};
      this.openSnackbar(this.createdNote);
    });
  }

  private openSnackbar(message) {
    this._snackBar.open(message, null, {
      duration: fiveSeconds,
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

  logout() {
    this.authService.logout();
  }
}
