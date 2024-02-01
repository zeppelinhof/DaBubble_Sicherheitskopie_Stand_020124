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
  isDesktop = window.innerWidth > 768;

  constructor(
    public userService: UserService,
    public auth: AuthenticationService,
    public settingsService: UserSettingsService
  ) {}

  changeUserDataForm: any = new FormGroup({
    name: new FormControl('', [Validators.minLength(3)]),
  });

  /**
   * Checks if no valid data is entered in the change user data form.
   * @returns {boolean} - True if the form is not valid or if the name value is present, false otherwise.
   */
  noDataEntered(): boolean {
    const nameValue = this.changeUserDataForm.get('name')?.value;
    return !this.changeUserDataForm.valid || nameValue;
  }

  /**
   * Changes the user data, updating the name if provided.
   * Closes the menu after updating the user data.
   */
  async changeUserData() {
    const nameValue = this.changeUserDataForm.get('name')?.value;
    const currentUser = this.userService.userLoggedIn();
    if (nameValue) {
      await this.userService.updateUser({ name: nameValue }, currentUser);
    }
    this.settingsService.closeMenu();
  }
}
