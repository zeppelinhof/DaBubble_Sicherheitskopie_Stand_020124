import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { InputService } from 'src/app/shared/services/input.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';

import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-login',
  templateUrl: './display-login.component.html',
  styleUrls: ['./display-login.component.scss'],
})
export class DisplayLoginComponent {
  guestUser: User = new User();
  passwordIsWrong: boolean = false;

  loginForm: any = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    public auth: AuthenticationService,
    private userService: UserService,
    private inputService: InputService
  ) {}

  /**
   * Submits the login form, logs in the user if the form is valid, and the user exists.
   */
  submit() {
    if (this.loginFormIsValid() && this.checkUserIsExisting())
      this.userLogsIn();
  }

  /**
   * Checks if the signup form is valid.
   */
  loginFormIsValid(): boolean {
    return this.loginForm.valid;
  }

  /**
   * Checks if the user with the provided login email is existing.
   */
  checkUserIsExisting() {
    const emailInputField = this.loginForm.get('email').value;
    const emailExists = this.userService.myUsers.some(
      (user) => user.email === emailInputField
    );
    return emailExists;
  }

  /**
   * Logs in the user using the provided email and password from the login form.
   */
  userLogsIn() {
    this.auth.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
  }

  /////////////////////////////GUEST-LOGIN/////////////////////////////

  /**
   * Sets guest user data by determining the next available guest number + standard name, email and password.
   */
  setGuestData() {
    const maxGuestNumber = this.checkMaxGuestNumber();
    const numberForNewGuest = maxGuestNumber + 1;
    this.guestUser.name = `Gast${numberForNewGuest}`;
    this.guestUser.email = `guest${numberForNewGuest}@bubble.de`;
    this.guestUser.img = 'userMale3.png';
    const guestPassword = '#23ffgwßffpü"!!**';
    this.guestGetsSignedUpandLoggedIn(guestPassword);
  }

  /**
   * Signs up the guest user and logs them in.
   * @param {string} guestPassword - The password for the guest user.
   */
  guestGetsSignedUpandLoggedIn(guestPassword: string) {
    this.auth.signUp(this.guestUser, guestPassword);
  }

  /**
   * Checks the maximum guest number from existing users.
   * @returns {number} - The maximum guest number.
   */
  checkMaxGuestNumber() {
    const guestNumbers: number[] = [];
    this.userService.myUsers.forEach((user) => {
      if (user.name.includes('Gast')) {
        const numberMatch = user.name.match(/\d+/);
        if (numberMatch) {
          const guestNumber = parseInt(numberMatch[0], 10);
          guestNumbers.push(guestNumber);
        }
      }
    });
    const maxGuestNumber = Math.max(...guestNumbers);
    return maxGuestNumber;
  }
}
