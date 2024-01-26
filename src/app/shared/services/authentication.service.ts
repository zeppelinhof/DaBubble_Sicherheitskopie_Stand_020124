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
  signInWithRedirect,
  sendPasswordResetEmail,
  updateEmail,
  getRedirectResult,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';

import {
  collection,
  doc,
  Firestore,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';

import { confirmPasswordReset } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user';
import { inject, Injectable } from '@angular/core';
import { ChannelService } from './channel.service';
import { MessageTime } from 'src/app/models/message-time';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  firestore: Firestore = inject(Firestore);
  allUserCol = collection(this.firestore, 'allUsers');
  passwordLoginIsWrong: boolean = false;
  loggedUser: User = new User();
  loggedUserMail: string | null = '';
  loggedUserName: string | null = '';
  googleLoginInProgress: boolean = false;
  loggedGoggleUser: User = new User();

  constructor(private userService: UserService, private cs: ChannelService, private router: Router) { }

  /**
   * Signs up a new user with the provided user information and password.
   * Sends user information to the database after successful sign-up.
   * Logs in the user after sign-up.
   * @param {User} newUser - The user information for the new user.
   * @param {string} password - The password for the new user.
   */
  async signUp(newUser: User, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        newUser.customId = user.uid;
        newUser.chats = this.sendDefaultMessage();
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

  sendDefaultMessage() {
    let messageId = Date.now();
    let defaultUserId = 'lb8OZ3BDULhTkFDDS7OK8kNIISt1'

    // Nachricht bei eingeloggtem User speichern
    let deafaultMessage = new Message(defaultUserId, messageId, 'Hi', this.cs.getCleanMessageTimeJson(new MessageTime(new Date().getDate(), this.cs.todaysDate(), this.cs.getTime())));
    // Nachricht bvei Default-User Sophia speichern
    this.userService.updateDefaultUser(
      { chats: [this.userService.getCleanMessageJson(deafaultMessage)] }, defaultUserId);

    return [deafaultMessage];
  }

  /**
   * Signs up a user using Google authentication.
   */
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    this.googleLoginInProgress = true;
    signInWithRedirect(auth, provider);
  }

  async getGoogleUserData() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        const user = result?.user;
        if (user) {
          this.loggedGoggleUser = new User();
          this.loggedGoggleUser.customId = user.uid || '';
          this.loggedGoggleUser.name = user.displayName || '';
          this.loggedGoggleUser.email = user.email || '';
          this.loggedGoggleUser.img = 'assets/imgs/userMale3.png';          
          this.checkIfNewGoogleUser(user.email);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  }

  async checkIfNewGoogleUser(emailToBeChecked: string | null) {
    const qu = query(this.allUserCol, where('email', '==', emailToBeChecked));
    onSnapshot(qu, (querySnapshot) => {
      let existingUser: boolean = false;
      if (!existingUser) {
        querySnapshot.forEach((element) => {
          let foundUser: any = element.data();
          existingUser = true;
        });
      }
      if (!existingUser) this.addNewGoogleUser();
    });
  }

  addNewGoogleUser() {    
    this.loggedGoggleUser.chats = this.sendDefaultMessage();
    this.userService.sendDocToDB(this.loggedGoggleUser);
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
   * Checks if a user is logged in. If logged in, navigates to path.
   */
  checkIfUserIslogged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
    if (!this.googleLoginInProgress && !this.router.url.includes('login')) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Logs out the currently authenticated user.
   */
  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => { })
      .catch((error) => { });
  }

  /**
   * Sends a password reset email to the specified email address.
   * @param {string} email - The email address to send the password reset email to.
   */
  sendEmailToResetPw(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => { })
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

  async updateUserEmail(newEmail: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        await verifyBeforeUpdateEmail(user, newEmail);
        window.location.reload();
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }

  /*
  updateUserEmail(newEmail: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('test');

    if (user) {
      updateEmail(user, newEmail)
        .then(() => {
          console.log('updated');
        })
        .catch((error) => { });
    }
  }
  */
}
