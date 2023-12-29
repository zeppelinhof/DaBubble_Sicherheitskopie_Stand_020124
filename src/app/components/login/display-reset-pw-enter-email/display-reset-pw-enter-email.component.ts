import { AuthenticationService } from './../../../shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-reset-pw-enter-email',
  templateUrl: './display-reset-pw-enter-email.component.html',
  styleUrls: ['./display-reset-pw-enter-email.component.scss'],
})
export class DisplayResetPwEnterEmailComponent {
  arrowBackIsHovered: boolean = false;

  forgotPwEnterEmail: any = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(
    private userService: UserService,
    public auth: AuthenticationService
  ) {}

  /**
   * Checks if the user with the provided login email is existing.
   */
  checkUserIsExisting() {
    const emailInputField = this.forgotPwEnterEmail.get('email').value;
    const emailExists = this.userService.myUsers.some(
      (user) => user.email === emailInputField
    );
    return emailExists;
  }
}
