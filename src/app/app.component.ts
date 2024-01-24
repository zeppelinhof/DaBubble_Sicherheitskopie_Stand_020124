import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DABubble';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {
    this.auth.checkIfUserIslogged();
    this.setBodyBgColor();
  }

  setBodyBgColor() {
    const currentRoute = this.router.url;
    if (!currentRoute.includes('google-screen')) {
      document.body.style.backgroundColor = '#eceefe';
    }
  }
}
