import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
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

  async writeUserData(channel: Channel, userId: string) {
    await setDoc(doc(this.firestore, "channels", userId), channel);
  }

  todaysDate():string {
    const today = new Date();
    const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const weekday = weekdays[today.getDay()];
    const day = today.getDate();
    const month = new Intl.DateTimeFormat('de-DE', { month: 'long' }).format(today);

    const todayAsString = `${weekday}, ${day}. ${month}`;

    return todayAsString;
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
