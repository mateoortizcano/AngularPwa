import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  browserAuthTokenNode = 'fcmTokens/';

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }


  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (!user) {
        return;
      }

      const data = { [user.uid]: token };
      this.db.object(this.browserAuthTokenNode).update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  getNewtoken() {
    this.messaging.getToken().then(token => {
      debugger;
      this.updateToken(token);
    });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      this.currentMessage.next(payload);
    });
  }
}
