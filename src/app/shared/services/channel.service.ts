import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Channel } from 'src/app/interfaces/channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  firestore: Firestore = inject(Firestore);
  allChannelsCol = collection(this.firestore, 'channels');
  allChannels: any[] = [];

  constructor() {
    this.getChannelFromFirestore();
  }

  // getting allUser from DB and pushing data to -> allUsers: any[] = [];
  async getChannelFromFirestore() {
    const channelsRef = collection(this.firestore, 'channels');
    const querySnapshot = await getDocs(channelsRef);
    querySnapshot.forEach((doc) => {
      this.allChannels.push(doc.data());
    });
  }

  async sendDocToDB(item: Channel) {
    await addDoc(this.allChannelsCol, item);
  }
}
