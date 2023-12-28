import { getLocaleTimeFormat } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedUserId: string = '';
  passwordLoginIsWrong: boolean = false;

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
        newUser.id = user.uid;
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
   * Logs in a user with the provided email and password.
   * Navigates to the '/dashboard' route after successful login.
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string | null} name - The name of the new signed user (can be a string or null).
   */
  login(email: string, password: string) {
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
   * Checks if a user is logged in. If logged in, navigates to path.
   */
  checkIfUserIslogged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setLoggedUser(user);
        this.setPathWhenLogged();
      } else {
        this.setPathWhenNotLogged();
      }
    });
  }

  setLoggedUser(user: any) {
    this.loggedUserId = user.uid;
    console.log('loggedUserId', this.loggedUserId);
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
}
