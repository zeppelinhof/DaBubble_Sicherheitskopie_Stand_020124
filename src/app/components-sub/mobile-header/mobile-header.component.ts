
import { ChannelService } from 'src/app/shared/services/channel.service';
import { SearchInputService } from 'src/app/shared/services/search-input.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent  {
  userSettings: boolean = false;
  @ViewChild('input') input: ElementRef | undefined;
  constructor(public us: UserService,
    public auth: AuthenticationService,
    public ws: WorkspaceService,
    public sis: SearchInputService,
    private cs: ChannelService,
    private ts: ThreadService) { }



  reloadPage() {
    window.location.reload();
  }

  showGlobalResultsContainer() {
    this.ws.globalResults = true;
  }

  focusInput() {
    if (this.input && this.input.nativeElement) {
      this.input.nativeElement.focus();
    }
  }

  // angezeigter Suchvorschlag in Global Search auf max. 15 zeichen kürzen
  messagePreview(msgData: any): string {
  const message = msgData.type === 'directMessage' || msgData.type === 'channelMessage'
    ? msgData.chat.message    // Direkt oder Channel-Nachricht
    : msgData.thread.answer;   // Thread-Nachricht

  return message.length > 15 ? message.slice(0, 15) + '...' : message; 
}


  getRouterLink(msgData: any): string[] {
    if (msgData.userCustomId) {
      msgData.type === 'directMessage';
      return ['message'];
    } else {
      msgData.type === 'channelMessage';
      return ['channel'];
    }
  }

  async openChat(messageToSearch: any) {
    const userLoggedIn = this.us.userLoggedIn().customId;
    this.ws.messageToSearch = messageToSearch;
  
    if (messageToSearch.type === 'directMessage') {
      this.openDirectMessageChat(messageToSearch, userLoggedIn);
    } else if (messageToSearch.type === 'channelMessage') {
      this.openChannelMessageChat(messageToSearch);
    } else {
      this.openThreadMessageChat(messageToSearch);
    }
  
    this.resetSearchAndCloseResults();
  }
  
  openDirectMessageChat(messageToSearch: any, userLoggedIn: string) {
    this.setDirectMessageAndScrollToElement(messageToSearch, userLoggedIn);
  }
  
  openChannelMessageChat(messageToSearch: any) {
    this.setChannelAndScrollToElement(messageToSearch);
  }
  
  openThreadMessageChat(messageToSearch: any) {
    this.setThreadAndScrollToElement(messageToSearch);
  }
  
  resetSearchAndCloseResults() {
    this.ws.inputGlobalSearch = '';
    this.ws.closeGlobalResults();
  }
  

  async setDirectMessageAndScrollToElement(messageToSearch: any, userLoggedIn: string) {
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
    
    this.scrollWithDelay(messageToSearch.chat.message, messageToSearch);
  }

  async setChannelAndScrollToElement(messageToSearch: any) {
    this.cs.setChannelView(messageToSearch.channelId);
    await this.cs.getAllMessagesFromChannel(messageToSearch.channelId);
    this.ws.scrollToElementByContent(messageToSearch.chat.message.toLowerCase(), messageToSearch.type);
  }

  async setThreadAndScrollToElement(messageToSearch: any) {
    this.cs.setChannelView(messageToSearch.channelId);
    await this.cs.getAllMessagesFromChannel(messageToSearch.channelId);

    this.ws.threadContainerIsVisible = true;

    this.cs.setMessageView(messageToSearch.thread.messageId);
    this.ts.showThreads(messageToSearch.thread);    
    this.ts.createOrShowThread(messageToSearch.chat);

    this.scrollWithDelay(messageToSearch.thread.answer, messageToSearch);
  }

  scrollWithDelay(message: string, messageToSearch: any){
    setTimeout(() => {
      this.ws.scrollToElementByContent(message.toLowerCase(), messageToSearch.type);
    }, 100);
  }

  isMessageOfChatpartner(chat: Message, user: User, clickedMessage: any, userLoggedIn: string) {
    return (chat.messageId === clickedMessage.chat.messageId) &&
      (user.customId !== userLoggedIn);
  }

  getMessageSource(msgData: any) {
    // für Chats    
    if (msgData.type === 'directMessage') {
      if (msgData.userCustomId === this.us.userLoggedIn().customId) {
        return 'dir';
      }
      return this.us.getUserName(msgData.userCustomId);
      // für Channels 
    } else if (msgData.type === 'channelMessage') {
      return this.ws.getNameOfChannel(msgData.channelId) + '(Channel)';
    }
    // für Threads
    else {
      return this.ws.getNameOfChannel(msgData.channelId) + '>(Thread)';
    }
  }
}