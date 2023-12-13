import { AuthenticationService } from './../../../shared/services/authentication.service';
import { UserSessionCheckService } from './../../../shared/services/user-session-check.service';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-login',
  templateUrl: './display-login.component.html',
  styleUrls: ['./display-login.component.scss'],
})
export class DisplayLoginComponent {
  formIsSubmitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    public userSessionService: UserSessionCheckService,
    private Auth: AuthenticationService
  ) {}

  submit() {
    this.formIsSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.Auth.login(email, password);
    }
  }
}
