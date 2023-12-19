import { UserService } from './user.service';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loggedUser: any;
  constructor(private userService: UserService) {}

  signUp(newUser: User, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, password)
      .then((userCredential) => {
        this.userService.sendDocToDB(newUser);

        /*
        const user = userCredential.user;
        const uid = user.uid;
        this.addUidToUser(newUser, uid);
        console.log('new signed User', newUser);
        */
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  /*
  addUidToUser(newUser: User, uid: string) {
    newUser.id = uid;
    return newUser;
  }
  */

  login(email: any, password: any) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.loggedUser = user;
        console.log('loggedUser', this.loggedUser);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
