import { Router } from '@angular/router';
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
  userId: string = '';
  emailWasSent = false;

  forgotPwEnterEmailForm: any = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(
    private userService: UserService,
    public auth: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Checks if the user with the provided login email is existing.
   */
  checkUserIsExisting() {
    console.log(this.userService.myUsers);

    const emailInputField = this.forgotPwEnterEmailForm.get('email').value;
    const emailExists = this.userService.myUsers.find(
      (user) => user.email === emailInputField
    );
    if (emailExists != undefined) {
      this.userId = emailExists.customId;
    }
    return emailExists;
  }

  /**
   * Saves the user ID for password reset in the local storage, adds the current
   * date and time, and sends a password reset email to the specified email address.
   */
  saveResetAndSendEmail() {
    const emailForPwReset = this.forgotPwEnterEmailForm.get('email').value;
    this.auth.sendEmailToResetPw(emailForPwReset);
    this.emailWasSent = true;
    localStorage.setItem('userIdForPwReset', this.userId);
    const currentDateAndTime = new Date().toISOString();
    localStorage.setItem('pwResetRequestTime', currentDateAndTime);
  }
}
