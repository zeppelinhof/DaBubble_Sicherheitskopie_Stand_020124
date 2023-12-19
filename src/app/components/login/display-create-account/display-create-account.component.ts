import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-display-create-account',
  templateUrl: './display-create-account.component.html',
  styleUrls: ['./display-create-account.component.scss'],
})
export class DisplayCreateAccountComponent {
  arrowBackIsHovered: boolean = false;
  user: User = new User();
  sighUpSuccess: boolean | null = null;

  signUpForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    agreement: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private router: Router,
    private Auth: AuthenticationService,
    private us: UserService
  ) {}

  /**
   * Handles the form submission if the form is valid, contains a dot in the email, and the user does not already exist.
   * If all conditions are met, the user is registered in Firebase Authentication.
   */
  submit(): void {
    if (
      this.signUpFormIsValid() &&
      this.checkEmailContainsDot() &&
      !this.userIsAlreadyExisting()
    ) {
      this.saveDataAndShowAvatarRoute();
    }
  }

  /**
   * Saves user data to the local storage and navigates to the 'choose-avatar' route.
   */
  saveDataAndShowAvatarRoute(): void {
    const { name, email, password } = this.signUpForm.value;
    localStorage.setItem('signUpName', this.signUpForm.get('name').value);
    localStorage.setItem('signUpEmail', this.signUpForm.get('email').value);
    localStorage.setItem(
      'signUpPassword',
      this.signUpForm.get('password').value
    );
    this.router.navigate(['login/choose-avatar']);
  }

  /**
   * Checks if the signup form is valid.
   */
  signUpFormIsValid(): boolean {
    return this.signUpForm.valid;
  }

  /**
   * Checks if the email in the signup form contains a dot. Firebase requires a dot in the domain part of the email.
   */
  checkEmailContainsDot(): boolean {
    const emailInputField = this.signUpForm.get('email');
    if (emailInputField) {
      const email = emailInputField.value;
      const parts = email.split('@');
      return parts.length === 2 && parts[1].includes('.');
    } else {
      return false;
    }
  }

  /**
   * Checks if the user with the provided email already exists.
   */
  userIsAlreadyExisting(): boolean {
    const emailInputField = this.signUpForm.get('email').value;
    const emailExists = this.us.myUsers.some(
      (user) => user.email === emailInputField
    );
    return emailExists;
  }

  /**
   * Fills the user object with the provided name and email.
   * @param {string} name - The name of the input to fill in the user object.
   * @param {string} email - The email of the input to fill in the user object.
   */
  fillUserObject(name: string, email: string) {
    this.user.email = email;
    this.user.name = name;
  }
}
