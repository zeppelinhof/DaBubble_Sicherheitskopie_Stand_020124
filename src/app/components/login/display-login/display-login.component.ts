import {Router, RouterLink} from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { InputService } from 'src/app/shared/services/input.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-display-login',
  templateUrl: './display-login.component.html',
  styleUrls: ['./display-login.component.scss'],
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true
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

  /**
   * Sets body overflow property based on the current route.
   * If the current route includes 'display-login', it hides overflow temporarily for animation.
   */
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
   * Submits the login form if valid and the user exists.
   */
  submit() {
    if (this.loginFormIsValid() && this.checkUserIsExisting())
      this.userLogsIn();
  }

  /**
   * Checks if the login form is valid.
   * @returns {boolean} - True if the login form is valid, false otherwise.
   */
  loginFormIsValid(): boolean {
    return this.loginForm.valid;
  }

  /**
   * Checks if a user with the provided email exists.
   * @returns {boolean} - True if the user exists, false otherwise.
   */
  checkUserIsExisting() {
    const emailInputField = this.loginForm.get('email').value;
    const emailExists = this.userService.myUsers.some(
      (user) => user.email === emailInputField
    );
    return emailExists;
  }

  /**
   * Logs in the user with the provided credentials.
   */
  userLogsIn() {
    this.auth.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
  }

  /**
   * Sets guest user data and signs up and logs in the guest user.
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
   * Checks the maximum guest number and returns it.
   * @returns {number} - The maximum guest number.
   */
  checkMaxGuestNumber(): number {
    this.getRegisteredGuestNumbers();
    if (this.noGuestUsersRegistered()) {
      return 350;
    } else {
      const maxGuestNumber = Math.max(...this.guestNumbers);
      return maxGuestNumber;
    }
  }

  /**
   * Retrieves registered guest numbers.
   */
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

  /**
   * Checks if there are no guest users registered.
   * @returns {boolean} - True if no guest users are registered, false otherwise.
   */
  noGuestUsersRegistered(): boolean {
    return this.guestNumbers.length === 0;
  }

  /**
   * Signs up and logs in the guest user.
   */
  guestGetsSignedUpandLoggedIn() {
    this.auth.signUp(this.newGuestUser, this.newGuestUserPassword);
  }

  /**
   * Initiates Google login by navigating to the Google screen and signing in with Google.
   */
  googleLogin() {
    this.router.navigate(['/google-screen']);
    this.auth.signInWithGoogle();
  }
}
