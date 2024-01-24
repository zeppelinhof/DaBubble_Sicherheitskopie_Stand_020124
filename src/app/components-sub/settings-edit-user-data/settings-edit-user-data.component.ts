import { UserService } from './../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSettingsService } from './../../shared/services/user-settings.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-edit-user-data',
  templateUrl: './settings-edit-user-data.component.html',
  styleUrls: ['./settings-edit-user-data.component.scss'],
})
export class SettingsEditUserDataComponent {
  closeIsHovered: boolean = false;

  constructor(
    public userService: UserService,
    public auth: AuthenticationService,
    public settingsService: UserSettingsService
  ) {}

  changeUserDataForm: any = new FormGroup({
    email: new FormControl('', [Validators.email]),
    name: new FormControl('', [Validators.minLength(3)]),
  });

  /**
   * Checks if the email in the signup form contains a dot. Firebase requires a dot in the domain part of the email.
   */
  checkInputEmailContainsDot(): boolean {
    const emailInputField = this.changeUserDataForm.get('email');
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
   */
  userIsAlreadyExisting(): boolean {
    const emailInputField = this.changeUserDataForm.get('email').value;
    const emailExists = this.userService.myUsers.some(
      (user) => user.email === emailInputField
    );
    return emailExists;
  }

  /**
   * Checks if no data has been entered in the user data form.
   */
  noDataEntered() {
    const emailValue = this.changeUserDataForm.get('email')?.value;
    const nameValue = this.changeUserDataForm.get('name')?.value;
    return !this.changeUserDataForm.valid || (!emailValue && !nameValue);
  }

  /**
   * Asynchronously updates user data based on the entered values in the form.
   */
  async changeUserData() {
    const emailValue = this.changeUserDataForm.get('email')?.value;
    const nameValue = this.changeUserDataForm.get('name')?.value;
    const currentUser = this.userService.userLoggedIn();
    if (emailValue) {
      await this.userService.updateUser({ email: emailValue }, currentUser);
      await this.auth.updateEmailUser(emailValue);
    }
    if (nameValue) {
      await this.userService.updateUser({ name: nameValue }, currentUser);
    }
    this.settingsService.closeMenu();
  }
}
