import { AuthenticationService } from './../../../shared/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-reset-pw-enter-pw',
  templateUrl: './display-reset-pw-enter-pw.component.html',
  styleUrls: ['./display-reset-pw-enter-pw.component.scss'],
})
export class DisplayResetPwEnterPwComponent {
  isDesktop = window.innerWidth > 768;
  passwort: string = '';
  passwortConfirm: string = '';
  arrowBackIsHovered: boolean = false;
  linkIsExpired: boolean = false;
  oobCode: string;

  newPasswortForm: any = new FormGroup({
    passwordFirstInput: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/
      ),
    ]),
    passwordSecondInput: new FormControl('', [Validators.required]),
  });

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.getOobCode();
    this.checkPwResetLinkExpiration();
  }

  /**
   * Retrieves the oob code from the query parameters of the current route.
   * If the OOB code is not present in the query parameters, it defaults to null.
   */
  getOobCode() {
    this.oobCode = this.route.snapshot.queryParams['oobCode'] || null;
  }

  /**
   * Checks if the password reset link has expired based on the stored request time
   * in local storage. If the difference between the stored time and the current time
   * is greater than 12 hours, linkIsExpired is set to true.
   */
  checkPwResetLinkExpiration() {
    const storedTime = localStorage.getItem('pwResetRequestTime');
    if (!storedTime) {
      this.linkIsExpired = true;
      return;
    }
    const storedTimeObj = new Date(storedTime as string);
    const currentTime = new Date();
    const timeDifferenceInHours =
      Math.abs(currentTime.getTime() - storedTimeObj.getTime()) / 36e5;
    if (timeDifferenceInHours > 12) {
      this.linkIsExpired = true;
    }
  }

  /**
   * Checks if the entered passwords match.
   * @returns {boolean} - True if passwords match, false otherwise.
   */
  passwordsMatch() {
    const password = this.newPasswortForm.get('passwordFirstInput')?.value;
    const confirmPassword = this.newPasswortForm.get(
      'passwordSecondInput'
    )?.value;

    return password === confirmPassword;
  }

  /**
   * Initiates the process to change the user's password when the user is not logged in.
   */
  changePasswort() {
    this.auth.changePwWhenUserIsNotLogged(this.oobCode, this.passwort);
  }
}
