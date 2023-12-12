import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { UserService } from './user.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  firestore: Firestore = inject(Firestore);
  allChannelsCol = collection(this.firestore, 'channels');
  
  myChannels: any = {};
  clickedChannelId = new BehaviorSubject<string>('');
  clickedChannel = new BehaviorSubject<Channel>(new Channel());
  loadingUpdateData = false;
  unsubChannels;

  constructor(private us: UserService) {
    this.unsubChannels = this.subChannelList();
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
        console.log('Alle Kanäle', this.myChannels);
        // ausführen:
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
          this.clickedChannel.next(channelList[index]);
        }
      }
    }
  }

  setChannelView(id: string) {
    this.clickedChannelId.next(id);
    this.setCurrentChannel(this.clickedChannelId.value);
  }

  setChannelObject(obj: any, id: string): Channel {
    return new Channel(
      id,
      obj.name,
      obj.description,
      obj.members,
      obj.createdDate,
      obj.createdBy
    );
  }

  // dies ist notwendig, da in Firebase (nur) Json gespeichert wird
  getCleanChannelJson(channel: Channel): {} {
    return {
      customId: channel.customId,
      name: channel.name,
      description: channel.description,
      // members: channel.members,
      members: this.getCleanMemberJson(channel.members),
      createdDate: channel.createdDate,
      createdBy: this.us.getCleanUserJson(channel.createdBy),
      allMessages: channel.allMessages,
    };
  }

  getCleanMemberJson(members: User[]): {} {
    const memberArray = [];
    for (let index = 0; index < members.length; index++) {
      const member = members[index];
      const memberAsJson = this.us.getCleanUserJson(member);
      memberArray.push(memberAsJson);
    }
    return memberArray;
  }

  async sendDocToDB(item: Channel) {
    await addDoc(this.allChannelsCol, this.getCleanChannelJson(item));
  }

  async writeUserData(channel: Channel, userId: string) {
    await setDoc(doc(this.firestore, 'channels', userId), channel);
  }

  async updateChannel(newValue: any, channel: Channel) {
    this.loadingUpdateData = true;
    let docRef = this.getSingleDocRef('channels', channel.customId);
    await updateDoc(docRef, newValue)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        this.loadingUpdateData = false;
      });
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  async leaveChannel() {
    const channelId = this.clickedChannelId.value;
    const channel = this.myChannels.find((ch: Channel) => ch.customId === channelId);
  
    if (channel) {
      // user logged in: hier sei vorläufig User logged in Markus mit Id 5oDYsPkUGMb9FPqmqNGB
      const userIdToRemove = '5oDYsPkUGMb9FPqmqNGB';
  
      const updatedMembers = channel.members.filter((member: User)=> member.customId !== userIdToRemove);
  
      this.updateChannel({ members: updatedMembers }, this.clickedChannel.value);
    }
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

  // sending message to firebase allMessages array[] with help of customId of current channel
  sendMessageToChannel(id: any, message: {}) {
    
  }
}
