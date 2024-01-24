import { getLocaleTimeFormat } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail,
} from 'firebase/auth';

import { confirmPasswordReset } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  passwordLoginIsWrong: boolean = false;
  loggedUser: User = new User();
  loggedUserMail: string | null = '';
  loggedUserName: string | null = '';

  constructor(private userService: UserService, private router: Router) {}

  /**
   * Signs up a new user with the provided user information and password.
   * Sends user information to the database after successful sign-up.
   * Logs in the user after sign-up.
   * @param {User} newUser - The user information for the new user.
   * @param {string} password - The password for the new user.
   */
  signUp(newUser: User, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        newUser.customId = user.uid;
        this.userService.sendDocToDB(newUser);
      })
      .then(() => {
        this.login(newUser.email, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  /**
   * Signs up a user using Google authentication.
   */
  signUpWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (!this.userIsAlreadyExisting(user.email)) {
          let newUser = new User();
          newUser.customId = user.uid || '';
          newUser.name = user.displayName || '';
          newUser.email = user.email || '';
          newUser.img = 'userMale3.png';
          this.userService.sendDocToDB(newUser);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
      });
  }

  /**
   * Logs in a user with the provided email and password.
   * Navigates to the '/dashboard' route after successful login.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string | null} name - The name of the new signed user (can be a string or null).
   */
  login(email: string, password: string, updateUser?: 'updateUser') {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.passwordLoginIsWrong = true;
      });
  }

  /**
   * Checks if the user with the provided signup email already exists.
   */
  userIsAlreadyExisting(emailToCheck: string | null): boolean {
    const emailExists = this.userService.myUsers.some(
      (user) => user.email === emailToCheck
    );
    return emailExists;
  }

  /**
   * Checks if a user is logged in. If logged in, navigates to path.
   */
  checkIfUserIslogged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('logged User ', user.email, 'id', user.uid);
        this.loggedUserMail = user.email;
        this.loggedUserName = user.displayName;
        this.loggedUser.customId = user.uid;
        this.userService.loggedInUser = this.loggedUser;
        this.setPathWhenLogged();
      } else {
        this.setPathWhenNotLogged();
      }
    });
  }

  /**
   * Sets the path when the user is logged in.
   * Navigates to '/dashboard/channel' if the current path does not contain 'dashboard'.
   */
  setPathWhenLogged() {
    if (!this.router.url.includes('dashboard')) {
      this.router.navigate(['/dashboard/channel']);
    }
  }

  /**
   * Sets the path when the user is not logged in.
   * Navigates to '/login' if the current path does not contain 'login'.
   */
  setPathWhenNotLogged() {
    if (!this.router.url.includes('login')) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Logs out the currently authenticated user.
   */
  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  }

  /**
   * Sends a password reset email to the specified email address.
   * @param {string} email - The email address to send the password reset email to.
   */
  sendEmailToResetPw(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  /**
   * Changes the password when the user is not logged in using the provided oobCode and newPassword.
   * @param {string} oobCode - The out-of-band code sent to the user's email for password reset.
   * @param {string} newPassword - The new password to set for the user.
   */
  async changePwWhenUserIsNotLogged(oobCode: string, newPassword: string) {
    const auth = getAuth();
    await confirmPasswordReset(auth, oobCode, newPassword);
    this.router.navigate(['/login']);
  }

  updateUserEmail(newEmail: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      updateEmail(user, newEmail)
        .then(() => {
          console.log('updated');
        })
        .catch((error) => {});
    }
  }
}
