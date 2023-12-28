import { Component, inject } from '@angular/core';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import {
  Firestore,
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';

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
    // Es werden nur die User angezeigt, welche in ihrem Chat die customId von Logged In User haben 
    // Also: Diejenigen, welche von Logged In User angeschrieben wurden
    const filteredUsers = this.us.myUsers.filter((user: User) => {
      if (this.us.userLoggedIn().chats && user.chats) {
        return user.chats.some((chat: Message) => chat.userCustomId === this.us.userLoggedIn().customId);
      } else {
        return [];
      }
    });

    // diejenigen, welche Logged In User angeschrieben haben, ohne dass Logged User diese zuvor angeschrieben hat, werden nun auch hinzugefügt
    for (let index = 0; index < this.us.userLoggedIn().chats!.length; index++) {
      const userLoggedInChats = this.us.userLoggedIn().chats![index];
      let alreadyIncluded: boolean = false;
      for (let index = 0; index < filteredUsers.length; index++) {
        const filteredUser = filteredUsers[index];
        if (userLoggedInChats.userCustomId === filteredUser.customId) {
          alreadyIncluded = true;
        }
      }
      if (!alreadyIncluded) {
        const userToAdd = this.us.myUsers.find((user: User) => user.customId === userLoggedInChats.userCustomId);
        if (userToAdd) {
          // falls noch
          filteredUsers.push(userToAdd);
        }
      }

    }

    return filteredUsers;
  }

  getChannels() {
    // User logged in: hier sei vorläufig User logged in Markus mit Id 5oDYsPkUGMb9FPqmqNGB
    // Es werden nur Channels angezeigt, in denen User Logged in ein Member ist  
    // (some wird verwendet, um zu überprüfen, ob mindestens ein Element im Array members die Bedingung erfüllt)    
    const onlyMyChannels = this.cs.myChannels.filter((channel: Channel) =>
      channel.members.some((member: User) => member.customId === this.us.userLoggedIn().customId)
    );
    return onlyMyChannels;
  }

  clickDownArrowChannels() {
    this.arrowClickedChannels = this.rightArrowChannels = !this.arrowClickedChannels;
    this.arrowClickedContacts = !this.arrowClickedChannels; // Direktnachrichten-Ansicht schließen, wenn Channels-Ansicht geöffnet
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = this.rightArrowContacts = !this.arrowClickedContacts;
    this.arrowClickedChannels = !this.arrowClickedContacts; // Channels-Ansicht schließen, wenn Direktnachrichten-Ansicht geöffnet
  }

}
