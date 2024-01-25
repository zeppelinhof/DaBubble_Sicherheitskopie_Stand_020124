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
    name: new FormControl('', [Validators.minLength(3)]),
  });

  /**
   * Checks if no data has been entered in the user data form.
   */
  noDataEntered() {
    const nameValue = this.changeUserDataForm.get('name')?.value;
    return !this.changeUserDataForm.valid || nameValue;
  }

  /**
   * Asynchronously updates user data based on the entered values in the form.
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
