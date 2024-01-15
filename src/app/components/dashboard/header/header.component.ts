import { ChannelService } from 'src/app/shared/services/channel.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { SearchInputService } from 'src/app/shared/services/search-input.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { SlicePipe } from '@angular/common';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public us: UserService, public auth: AuthenticationService, public ws: WorkspaceService, public sis: SearchInputService, private cs: ChannelService) { }



  reloadPage() {
    window.location.reload();
  }

  showGlobalResultsContainer() {
    this.ws.globalResults = true;
  }

  messagePreview(msgData: any): string {
    if (msgData.userCustomId) {
      return msgData.chat.message.length > 15 ? msgData.chat.message.slice(0, 15) + '...' : msgData.chat.message;
    } else if (msgData.channelId) {
      return msgData.chat.message.length > 15 ? msgData.chat.message.slice(0, 15) + '...' : msgData.chat.message;
    } else {
      return '';
    }

  }

  getRouterLink(msgData: any): string[] {
    if (msgData.userCustomId) {
      return ['message'];
    } else {
      return ['channel'];
    }

  }

  openChat(clickedMessage: any) {

    let userLoggedIn = this.us.userLoggedIn().customId;
    // Direktnachrichten
    if (clickedMessage.userCustomId) { 
      let allUsers = this.sis.getUsers();

      for (let user of allUsers) {
        if (user.chats) {
          for (let chat of user.chats) {
            if (this.isMessageOfChatpartner(chat, user, clickedMessage, userLoggedIn)) {
              this.us.setContactView(user.customId);
              break;
            }
          }
        }
      }
      // Channelnachrichten
    } else {
      this.cs.setChannelView(clickedMessage.channelId);
      this.cs.getAllMessagesFromChannel(clickedMessage.channelId)
    }
  }

  isMessageOfChatpartner(chat: Message, user: User, clickedMessage: any, userLoggedIn: string) {
    return (chat.messageId === clickedMessage.chat.messageId) &&
      (user.customId !== userLoggedIn);
  }

  getMessageSource(msgData: any) {
    // für Chats
    if (msgData.userCustomId) {
      return this.us.getUserName(msgData.userCustomId);
      // für Channels 
    } else {
      return this.ws.getNameOfChannel(msgData.channelId) + '(Channel)';
    }
  }
}
