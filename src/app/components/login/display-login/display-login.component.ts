import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { InputService } from 'src/app/shared/services/input.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-display-login',
  templateUrl: './display-login.component.html',
  styleUrls: ['./display-login.component.scss'],
})
export class DisplayLoginComponent {
  newGuestUser: User = new User();
  newGuestUserPassword: string = '';
  guestNumbers: number[] = [];
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
    private inputService: InputService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.setBodyOverflow();
  }

  setBodyOverflow() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('display-login')) {
      this.document.body.style.overflow = 'hidden';
      setTimeout(() => {
        this.document.body.style.overflow = '';
      }, 1900);
    }
  }

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
    this.newGuestUser.name = `Gast${numberForNewGuest}`;
    this.newGuestUser.email = `guest${numberForNewGuest}@bubble.de`;
    this.newGuestUser.img = 'assets/imgs/userMale3.png';
    this.newGuestUserPassword = '#23ffgwßffpü"!!**';
    this.guestGetsSignedUpandLoggedIn();
  }

  /**
   * Signs up the guest user and logs them in.
   */
  guestGetsSignedUpandLoggedIn() {
    this.auth.signUp(this.newGuestUser, this.newGuestUserPassword);
  }

  /**
   * Checks the maximum guest number from existing guest users.
   * @returns {number} - The maximum guest number.
   */
  checkMaxGuestNumber() {
    this.getRegisteredGuestNumbers();
    if (this.noGuestUsersRegistered()) {
      return 350;
    } else {
      const maxGuestNumber = Math.max(...this.guestNumbers);
      return maxGuestNumber;
    }
  }

  getRegisteredGuestNumbers() {
    this.userService.myUsers.forEach((user) => {
      if (user.name.includes('Gast')) {
        const numberMatch = user.name.match(/\d+/);
        if (numberMatch) {
          const guestNumber = parseInt(numberMatch[0], 10);
          this.guestNumbers.push(guestNumber);
        }
      }
    });
  }

  noGuestUsersRegistered() {
    return this.guestNumbers.length === 0;
  }

  googleLogin() {
    this.router.navigate(['/google-screen']);
    this.auth.signInWithGoogle();
  }
}
