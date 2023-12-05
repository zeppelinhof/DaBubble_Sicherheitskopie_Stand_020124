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
} from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  allUserCol = collection(this.firestore, 'allUsers');
  // allUsers: any[] = [];
  // allUsersId: any[] = [];

  allUsersNew: any[] = [];
  // unsubUser;

  constructor() {
    // this.getUserFromFirestore();
    // this.unsubUser = this.subUserList();
  }

  // getting allUser from DB and pushing data to -> allUsers: any[] = [];
  // async getUserFromFirestore() {
  //   const usersRef = collection(this.firestore, 'allUsers');
  //   const querySnapshot = await getDocs(usersRef);
  //   querySnapshot.forEach((doc) => {
  //     const userId = doc.id;
  //     this.allUsersId.push(userId);
  //   });
  //   this.getUserDataFromFirestore();
  // }

  
  // async getUserDataFromFirestore() {
  //   // Iteriere durch die gesammelten IDs und rufe die zugehörigen Dokumentdaten ab
  //   for (const userId of this.allUsersId) {
  //     const userDocRef = doc(this.firestore, 'allUsers', userId);
  //     const userDocSnapshot = await getDoc(userDocRef);

  //     if (userDocSnapshot.exists()) {
  //       const userData = userDocSnapshot.data();
  //       this.allUsers.push(userData);
  //     } else {
  //       console.error(`Dokument mit ID ${userId} nicht gefunden`);
  //     }
  //   }
  // }

  subUserList() {
    // return onSnapshot(this.getUserRef(), (list) => {
    //   this.allUsersNew = [];
    //   list.forEach((element) => {
    //     this.allUsersNew.push(this.setUserObject(element.data(), element.id));
    //   })
    // });

  }

  getUserRef() {
    return collection(this.firestore, 'allUsers');
  }

  setUserObject(obj: any, id:string): User {
    return {
      custId: id,
      firstName: obj.firstName,
      lastName: obj.lastName || "",
      email: obj.email,
      password: obj.password,
      img: obj.img || "",
      chats: obj.chats || [{}]
    }
  }





  async sendDocToDB(item: User) {
    await addDoc(this.allUserCol, item);
  }
}
