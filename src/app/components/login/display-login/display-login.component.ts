import { Component } from '@angular/core';

@Component({
  selector: 'app-display-login',
  templateUrl: './display-login.component.html',
  styleUrls: ['./display-login.component.scss'],
})
export class DisplayLoginComponent {
  emailIsInvalid: boolean = true;
  passwordIsWrong: boolean = true;
}
