import { UserSessionCheckService } from './../../../shared/services/user-session-check.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-login',
  templateUrl: './display-login.component.html',
  styleUrls: ['./display-login.component.scss'],
})
export class DisplayLoginComponent {
  emailIsInvalid: boolean = false;
  passwordIsWrong: boolean = false;

  constructor(public userSessionService: UserSessionCheckService) {}
}
