import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore: Firestore = inject(Firestore)
  allUserCol = collection(this.firestore, "allUsers");
  allUsers: any[] = [];
  

  constructor() {
    this.getUserFromFirestore();
    
    
  }



  // getting allUser from DB and pushing data to -> allUsers: any[] = [];
  async getUserFromFirestore() {
    const usersRef = collection(this.firestore, "allUsers");
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      this.allUsers.push(doc.data());
    });
  };

  async sendDocToDB(item: User) {
    await addDoc(this.allUserCol, item);
  }

}
