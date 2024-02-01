import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-display-reset-pw-enter-email',
  templateUrl: './display-reset-pw-enter-email.component.html',
  styleUrls: ['./display-reset-pw-enter-email.component.scss'],
})
export class DisplayResetPwEnterEmailComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > 768;
  userId: string = '';
  emailWasSent = false;

  forgotPwEnterEmailForm: any = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(
    private userService: UserService,
    public auth: AuthenticationService,
    public animations: AnimationsService,
    private router: Router
  ) {}

  /**
   * Checks if the user with the provided login email is existing and sets the user id.
   * @returns {boolean} - True if the user exists, false otherwise.
   */
  checkUserIsExisting(): User | undefined {
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
    this.showAnimation();
    setTimeout(() => {
      this.hideAnimation();
      this.router.navigate(['login/display-login']);
    }, 1000);
    this.setLocalStorage();
  }

  /**
   * Shows the success animation and disables body scroll.
   */
  showAnimation() {
    document.body.style.overflow = 'hidden';
    this.animations.setEmailWasSent(true);
  }

  /**
   * Hides the success animation.
   */
  hideAnimation() {
    this.animations.setEmailWasSent(false);
  }

  /**
   * Sets local storage items for password reset.
   * - Sets 'userIdForPwReset' with the current user's ID.
   * - Sets 'pwResetRequestTime' with the current date and time.
   */
  setLocalStorage() {
    localStorage.setItem('userIdForPwReset', this.userId);
    const currentDateAndTime = new Date().toISOString();
    localStorage.setItem('pwResetRequestTime', currentDateAndTime);
  }
}
