import { UserSessionCheckService } from './shared/services/user-session-check.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DaBubble';

  constructor(public userSessionService: UserSessionCheckService) {
    this.userSessionService.chckIfUserIsLogged();
  }
}
