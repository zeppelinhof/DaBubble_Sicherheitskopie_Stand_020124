import { Component, Input } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-message-of-user',
  templateUrl: './message-of-user.component.html',
  styleUrls: ['./message-of-user.component.scss']
})
export class MessageOfUserComponent {
  @Input() messageData: Message = new Message();
  @Input() data: Message = new Message();
  @Input() messageType: string = 'channel';
  getEditMode: boolean = false;
  showReactionChoice: boolean = false;
  previousMessage: string = '';
  clickedContact!: User;
  clickedChannel!: Channel;
  unsubAllUsers: any;

  constructor(public us: UserService, private cs: ChannelService, public ws: WorkspaceService) { }

  ngOnInit(): void {
    this.unsubAllUsers = this.us.subAllUsersListFindUserName();
    this.getCurrentUser();
    this.getCurrentChannel();
    this.savePreviousMessage();    
  }

  savePreviousMessage() {
    this.previousMessage = this.data.message || this.messageData.message;
  }

  reactionChoice(show: boolean) {
    this.showReactionChoice = show;
  }

  receiveValueFromChild(value: boolean) {
    // Handle erhaltenen Wert von Kindkomponente
    this.getEditMode = value;
  }

  getCurrentUser() {
    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
    });
  }
  
  // fills allMembers array with all users in the current channel
  getCurrentChannel() {
    this.cs.clickedChannel.subscribe((ch: Channel) => {
      this.clickedChannel = ch;
    });
  }

  // Die editierte Direkt-Nachricht oder Channel-Nachricht speichern
  saveEditedMessage() {
    // Handle Direct Message
    if (this.messageType === 'directMessage') {    
      // Nachricht bei Empfänger hinterlegen
      this.us.updateUser({ chats: this.getAllChatsOfUser(this.clickedContact) }, this.clickedContact);
      // Nachricht bei Sender hinterlegen
      this.us.updateUser({ chats: this.getAllChatsOfUser(this.us.userLoggedIn()) }, this.us.userLoggedIn());
    } 
    // Handle Channel Message
    else if (this.messageType === 'channelMessage') {
      this.cs.updateChannel({ allMessages: this.getAllMessagesOfChannel(this.clickedChannel) }, this.clickedChannel);
    } else {
      console.log('Speichern nicht erfolgreich');

    }
    this.closeEditWindow();
  }

  takePreviousMessage() {
    this.data.message = this.previousMessage;
  }

  closeEditWindow() {
    this.getEditMode = false; //close edit window
  }

  getAllChatsOfUser(forUser: User) {
    let allChats = [];

    for (let index = 0; index < forUser.chats!.length; index++) {
      const chat = forUser.chats![index];
      // wenn die messageId der alten Nachticht gleich der messageId der bearbeiteten Nachricht ist
      // so soll die neue Nachricht eingetragen werden.
      const messageDataMessageId = this.messageData.messageId;
      const chatMessageId = chat.messageId;
      if (chatMessageId === messageDataMessageId) {
        chat.message = this.messageData.message; // neu eingegebener Wert für Message
        allChats.push(chat);
        // für alle anderen Nachrichten die alte Nachricht übernehmen
      } else {
        allChats.push(chat);
      }
    }

    return allChats;
  }

  getAllMessagesOfChannel(forChannel: Channel) {
    let allChats = [];

    for (let index = 0; index < forChannel.allMessages!.length; index++) {
      const chat = forChannel.allMessages![index];
      // wenn die messageId der alten Nachticht gleich der messageId der bearbeiteten Nachricht ist
      // so soll die neue Nachricht eingetragen werden.
      const dataMessageId = this.data.messageId;
      const chatMessageId = chat.messageId;

      if (chatMessageId === dataMessageId) {
        chat.message = this.data.message; // neu eingegebener Wert für Message
        allChats.push(chat);
        // für alle anderen Nachrichten die alte Nachricht übernehmen
      } else {
        allChats.push(chat);
      }
    }

    return allChats;
  }

  checkIfOwnMessage(): boolean {
    if (this.messageData.userCustomId) {
      return this.messageData.userCustomId == this.us.userLoggedIn().customId;
    } else if (this.data.userCustomId) {
      return this.data.userCustomId == this.us.userLoggedIn().customId;
    }
    return false;
  }


}