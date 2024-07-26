import { InputService } from 'src/app/shared/services/input.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-display-create-account',
  templateUrl: './display-create-account.component.html',
  styleUrls: ['./display-create-account.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class DisplayCreateAccountComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > 768;
  user: User = new User();
  sighUpSuccess: boolean | null = null;

  signUpForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/
      ),
    ]),
    agreement: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private inputService: InputService
  ) {}

  /**
   * Handles the form submission if the form is valid, contains a dot in the email, and the user does not already exist.
   * If all conditions are met, the user is registered in Firebase Authentication.
   */
  submit() {
    if (
      this.signUpFormIsValid() &&
      this.checkInputEmailContainsDot() &&
      !this.userIsAlreadyExisting()
    ) {
      this.saveDataAndNavigateToAvatarRoute();
    }
  }

  /**
   * Checks if the signup form is valid.
   * @returns {boolean} - True if form is valid.
   */
  signUpFormIsValid(): boolean {
    return this.signUpForm.valid;
  }

  /**
   * Checks if the email in the signup form contains a dot and @.
   * @returns {boolean} - True if email is valid.
   */
  checkInputEmailContainsDot(): boolean {
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
   * Checks if the user with the provided signup email already exists.
   * @returns {boolean} - True if user is existing.
   */
  userIsAlreadyExisting(): boolean {
    const emailInputField = this.signUpForm.get('email').value;
    const emailExists = this.userService.myUsers.some(
      (user) => user.email === emailInputField
    );
    return emailExists;
  }

  /**
   * Saves user data to the local storage and navigates to the 'choose-avatar' route.
   */
  saveDataAndNavigateToAvatarRoute() {
    const { name, email, password } = this.signUpForm.value;
    localStorage.setItem('signUpName', this.signUpForm.get('name').value);
    localStorage.setItem('signUpEmail', this.signUpForm.get('email').value);
    localStorage.setItem(
      'signUpPassword',
      this.signUpForm.get('password').value
    );
    this.router.navigate(['login/choose-avatar']);
  }
}
