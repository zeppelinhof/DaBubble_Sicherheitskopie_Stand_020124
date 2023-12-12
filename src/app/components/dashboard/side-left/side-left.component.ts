import { Component, inject } from '@angular/core';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import {
  Firestore,
  collection,
  query,
  onSnapshot,
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss'],
})
export class SideLeftComponent {
  firestore: Firestore = inject(Firestore);
  arrowClickedChannels: boolean = false;
  arrowClickedContacts: boolean = false;
  rightArrowChannels: boolean = false;
  rightArrowContacts: boolean = false;

  myUserId: any = [];

  constructor(
    public us: UserService,
    public ws: WorkspaceService,
    public cs: ChannelService
  ) { }

  getUsers() {
    // später: um nur die Kontakte anzuzeigen
    // for (let index = 0; index < userLoggedIn.chats.length; index++) {
    //   const contactName = userLoggedIn.chats[index].firstName;
    //   return contactName;
    // }
    return this.us.myUsers;
  }

  getChannels() {  
    // User logged in: hier sei vorläufig User logged in Markus mit Id 5oDYsPkUGMb9FPqmqNGB
    // Es werden nur Channels angezeigt, in denen User Logged in ein Member ist  
    // (some wird verwendet, um zu überprüfen, ob mindestens ein Element im Array members die Bedingung erfüllt)

    const onlyMyChannels = this.cs.myChannels.filter((channel: Channel) =>
      channel.members.some((member: User) => member.customId === '5oDYsPkUGMb9FPqmqNGB')
    );
    return onlyMyChannels;
  }

  clickDownArrowChannels() {
    this.arrowClickedChannels = this.rightArrowChannels = !this.arrowClickedChannels ? true : false;
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = this.rightArrowContacts = !this.arrowClickedContacts ? true : false;
  }
}
