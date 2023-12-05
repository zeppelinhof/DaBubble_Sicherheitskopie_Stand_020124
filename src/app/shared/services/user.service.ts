import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  where,
  query,
} from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  allUserCol = collection(this.firestore, 'allUsers');
  myUsers: any = [];

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
        console.log('Element Id:', element);
      });
    });
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
