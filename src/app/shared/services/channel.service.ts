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
  unsubChannels;

  constructor() {
    this.unsubChannels = this.subChannelList();
  }

  subChannelList() {
    const qu = query(collection(this.firestore, 'channels'));
    onSnapshot(qu, (querySnapshot) => {
      this.myChannels = [];
      querySnapshot.forEach((element) => {
        this.myChannels.push(this.setChannelObject(element.data(), element.id));
        this.setCurrentChannelId();
      });
    });
  }

  setCurrentChannelId(){
    const channelList = this.myChannels;
    if (this.myChannels) {
      for (let index = 0; index < channelList.length; index++) {
        const chId = channelList[index]['customId'].value;        
        if(chId == this.clickedChannelId.value){
          this.setChannelView(chId);
          debugger
        }
      }
    }
  }

  setChannelView(id: string){
    debugger
    this.clickedChannelId.next(id);
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
