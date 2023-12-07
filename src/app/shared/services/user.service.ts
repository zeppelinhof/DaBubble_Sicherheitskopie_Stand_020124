import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  allUserCol = collection(this.firestore, 'allUsers');
  myUsers: any = [];
  clickedContactId = new BehaviorSubject<string>('');
  clickedContact = new BehaviorSubject<User>({
    custId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    img: '',
    // chats: [{user: any, messages: []}]
  });

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
        if (elementId == userList[index]['custId']) {
          this.clickedContact.next(userList[index]);
          console.log('Der aktuelle Contact', this.clickedContact);
          console.log(userList[index]['custId'].value);
        }
      }
    }
  }

  setContactView(id: string) {
    this.clickedContactId.next(id);
    this.setCurrentContact(this.clickedContactId.value);

  }

  setUserObject(obj: any, id: string): User {
    return {
      custId: id,
      firstName: obj.firstName,
      lastName: obj.lastName || '',
      email: obj.email,
      password: obj.password,
      img: obj.img || '',
      chats: obj.chats || [{}],
    };
  }

  async sendDocToDB(item: User) {
    await addDoc(this.allUserCol, item);
  }
}
