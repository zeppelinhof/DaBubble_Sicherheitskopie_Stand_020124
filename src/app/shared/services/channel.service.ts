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

  async sendDocToDB(item: Channel) {
    await addDoc(this.allChannelsCol, item);
  }

  setChannelObject(obj: any, id: string): Channel {
    return {
      customId: id,
      createdDate: obj.createdDate,
      name: obj.name,
      description: obj.description,
      createdBy: obj.createdBy,
      members: obj.members
    }
  }

  
}
