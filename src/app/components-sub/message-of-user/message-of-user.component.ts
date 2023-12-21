import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageTime } from 'src/app/models/message-time';
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
  unsubAllUsers: any;

  constructor(public us: UserService, private cs: ChannelService, public ws: WorkspaceService) { }

  ngOnInit(): void {
    this.unsubAllUsers = this.us.subAllUsersListFindUserName();
    this.getCurrentUser();
    this.savePreviousMessage();
  }

  savePreviousMessage() {
    this.previousMessage = this.data.message || this.messageData.message
  }

  reactionChoice(show: boolean) {
    this.showReactionChoice = show;
  }

  receiveValueFromChild(value: boolean) {
    // Handle erhhaltenen Wert von Kindkomponente
    this.getEditMode = value;
  }

  // UPDATE MESSAGE

  getCurrentUser() {
    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
    });
  }

  saveEditedMessage(clickedContact: User) {
    let unixId = Date.now(); // id einer Nachricht im Zeitstempel createdTime
    // Nachricht bei Empfänger hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(clickedContact, unixId) }, clickedContact);
    // Nachricht bei Sender hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(this.us.userLoggedIn(), unixId) }, this.us.userLoggedIn());

    this.closeEditWindow();
  }

  takePreviousMessage(){
    this.data.message = this.previousMessage;
  }

  closeEditWindow() {
    this.getEditMode = false; //close edit window
  }

  getAllChatsOfUser(forUser: User, unixId: number) {
    let allChats = [];

    for (let index = 0; index < forUser.chats!.length; index++) {
      const chat = forUser.chats![index];
      // wenn die unixId der alten Nachticht gleich der unixId der bearbeiteten Nachricht ist
      // so soll die neue Nachricht eingetragen werden.
      const messageDataUnixId = this.messageData.createdTime['unixId'];
      const dataUnixId = this.data.createdTime['unixId'];
      const chatUnixId = chat.createdTime['unixId'];

      if (chatUnixId === messageDataUnixId || chatUnixId === dataUnixId) {
        chat.message = this.messageData.message; // neu eingegebener Wert für Message
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
    }
    return false;
  }


}