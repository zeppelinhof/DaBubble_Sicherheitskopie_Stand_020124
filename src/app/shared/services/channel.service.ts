import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Channel } from 'src/app/interfaces/channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  firestore: Firestore = inject(Firestore);
  allChannelsCol = collection(this.firestore, 'channels');
  
  clickedChannelId = new BehaviorSubject<string>('');
  myChannels: any = [];
  clickedChannel!: Channel;
  unsubChannels;

  constructor() {
    this.unsubChannels = this.subChannelList();
    console.log(this.myChannels);
    
  }

  // Collection Channels beobachten
  subChannelList() {
    const qu = query(collection(this.firestore, 'channels'));
    onSnapshot(qu, (querySnapshot) => {
      // bei jeder Änderung in der Collection folgendes tun:
      this.myChannels = [];
      // Für jeden Channel in Channels (aus Firebase)...
      querySnapshot.forEach((element) => {
        // ... Array myChannels füllen
        this.myChannels.push(this.setChannelObject(element.data(), element.id));
        // ausführen:
        this.setCurrentChannel(element.id);
      });
    });
  }

  setCurrentChannel(elementId: string) {
    const channelList = this.myChannels;
    if (this.myChannels) {
      // für alle Channels in Firebase
      for (let index = 0; index < channelList.length; index++) {
        // wenn es sich um den aktuell angezeigten Channel handelt...
        if (elementId == channelList[index]['customId']) {
          // setze den aktuellen Channel (Objekt) gemäß angeklickter Channel Id
          this.clickedChannel = channelList[index];
          console.log('Der aktuelle Channel', this.clickedChannel);
          console.log(channelList[index]['customId'].value);
        }        
      }
    }
  }

  setChannelView(id: string) {
    this.clickedChannelId.next(id);
    this.setCurrentChannel(this.clickedChannelId.value);
  }

  setChannelObject(obj: any, id: string): Channel {
    return {
      customId: id,
      createdDate: obj.createdDate,
      name: obj.name,
      description: obj.description,
      createdBy: obj.createdBy,
      members: obj.members,
    };
  }

  async sendDocToDB(item: Channel) {
    await addDoc(this.allChannelsCol, item);
  }

  async writeUserData(channel: Channel, userId: string) {
    await setDoc(doc(this.firestore, 'channels', userId), channel);
  }

  todaysDate(): string {
    const today = new Date();
    const weekdays = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ];
    const weekday = weekdays[today.getDay()];
    const day = today.getDate();
    const month = new Intl.DateTimeFormat('de-DE', { month: 'long' }).format(
      today
    );

    const todayAsString = `${weekday}, ${day}. ${month}`;

    return todayAsString;
  }
}
