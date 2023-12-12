import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  allUserCol = collection(this.firestore, 'allUsers');
  myUsers: any = [];
  clickedContactId = new BehaviorSubject<string>('');
  clickedContact = new BehaviorSubject<User>(new User());

  unsubUsers;

  constructor() {
    this.unsubUsers = this.subUserList();
  }

  subUserList() {
    const qu = query(collection(this.firestore, 'allUsers'));
    onSnapshot(qu, (querySnapshot) => {
      this.myUsers = [];
      querySnapshot.forEach((element) => {
        this.myUsers.push(this.setUserObject(element.data(), element.id));
        this.setCurrentContact(element.id);
      });
    });
  }

  setCurrentContact(elementId: string) {
    const userList = this.myUsers;
    if (this.myUsers) {
      for (let index = 0; index < userList.length; index++) {
        // wenn es sich um den aktuell angezeigten Channel handelt...
        if (elementId == userList[index]['customId']) {
          this.clickedContact.next(userList[index]);
        }
      }
    }
  }

  setContactView(id: string) {
    this.clickedContactId.next(id);
    this.setCurrentContact(this.clickedContactId.value);

  }

  setUserObject(obj: any, id: string): User {
    return new User(id, obj.firstName, obj.lastName, obj.email, obj.password, obj.img, obj.chats)
  }

  getCleanUserJson(user: User): {} {
    return {
      customId: user.customId,
      firstName: user.firstName,
      lastName: user.lastName || '',
      email: user.email,
      password: user.password,
      img: user.img || '',
      chats: user.chats || [{}],
    }
  }

  async sendDocToDB(item: User) {
    await addDoc(this.allUserCol, this.getCleanUserJson(item));
  }
}
