import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { MessagingService } from 'src/services/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private messagingService: MessagingService) { }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithFacebook().then( () => {
      this.messagingService.getNewtoken();
    });
  }

}
