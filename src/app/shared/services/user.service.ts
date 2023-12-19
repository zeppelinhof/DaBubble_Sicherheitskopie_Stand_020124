import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  onSnapshot,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  allUserCol = collection(this.firestore, 'allUsers');
  myUsers: User[] = [];
  clickedContactId = new BehaviorSubject<string>('');
  clickedContact = new BehaviorSubject<User>(new User());

  unsubUsers;

  constructor() {
    this.unsubUsers = this.subUserList();
  }

  // diese Funktion dient als Übergangslösung für den eingeloggten Nutzer
  userLoggedIn() {
    const loggedInUser = this.myUsers.filter((user: User) => user.customId === "5oDYsPkUGMb9FPqmqNGB");
    return loggedInUser[0];
  }

  async subUserList() {
    const qu = query(collection(this.firestore, 'allUsers'));
    onSnapshot(qu, (querySnapshot) => {
      this.myUsers = [];
      querySnapshot.forEach((element) => {
        this.myUsers.push(this.setUserObject(element.data(), element.id));
        this.setCurrentContact(this.clickedContactId.value);
      });
    });
  }  
  

  async updateUser(newValue: any, user: User) {
    // this.loadingUpdateData = true;
    let docRef = this.getSingleDocRef('allUsers', user.customId);
    await updateDoc(docRef, newValue)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('user updated');
      });
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
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
    return new User(id, id, obj.name, obj.email, obj.password, obj.img, obj.chats)
  }

  getCleanUserJson(user: User): {} {
    return {
      id: user.customId,
      customId: user.customId,
      name: user.name,
      email: user.email,
      password: user.password,
      img: user.img || '',
      chats: this.getCleanMessageArrayJson(user.chats || [new Message()]) || [{}],
      // chats:  user.chats || [{}],
    }
  }

  getCleanMessageArrayJson(messages: Message[]): {} {
    const messageArray = [];
    for (let index = 0; index < messages.length; index++) {
      const member = messages[index];
      const messageAsJson = this.getCleanMessageJson(member);
      messageArray.push(messageAsJson);
    }

    return messageArray;
  }



  getCleanMessageJson(message: Message): {} {
    return {
      userCustomId: message.userCustomId || '',
      message: message.message || '',
      createdTime: message.createdTime || '',
      emojis: message.emojis,
    };
  }

  async sendDocToDB(item: User) {
    await addDoc(this.allUserCol, this.getCleanUserJson(item));
  }
}
