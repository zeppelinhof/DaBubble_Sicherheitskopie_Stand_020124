import { ChannelService } from 'src/app/shared/services/channel.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { SearchInputService } from 'src/app/shared/services/search-input.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  messageType: string = '';

  constructor(public us: UserService,
    public auth: AuthenticationService,
    public ws: WorkspaceService,
    public sis: SearchInputService,
    private cs: ChannelService) { }



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
      this.messageType = 'directMessage'
      return ['message'];
    } else {
      this.messageType = 'channelMessage'
      return ['channel'];
    }

  }

  async openChat(messageToSearch: any) {

    let userLoggedIn = this.us.userLoggedIn().customId;
    this.ws.messageToSearch = messageToSearch;
    
    if (messageToSearch.userCustomId) {
      // Direktnachrichten
      this.setDirectMessage(messageToSearch, userLoggedIn)      
    } else {
      // Channelnachrichten
      this.setChannelAndScrollToElement(messageToSearch)
    }
    this.ws.closeGlobalResults();    
  }

  async setDirectMessage(messageToSearch: any, userLoggedIn: string) {
    let allUsers = this.sis.getUsers();

    for (let user of allUsers) {
      if (user.chats) {
        for (let chat of user.chats) {
          if (this.isMessageOfChatpartner(chat, user, messageToSearch, userLoggedIn)) {
            this.us.setContactView(user.customId);
            break;
          }
        }
      }
    }
    // ScrollToElement in message.component.ts after init
  }

  async setChannelAndScrollToElement(messageToSearch: any) {
    this.cs.setChannelView(messageToSearch.channelId);
    await this.cs.getAllMessagesFromChannel(messageToSearch.channelId);
    this.ws.scrollToElementByContent(messageToSearch.chat.message.toLowerCase());
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
