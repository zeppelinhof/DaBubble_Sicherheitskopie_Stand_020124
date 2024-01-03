import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SideRightComponent } from 'src/app/components/dashboard/side-right/side-right.component';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-message-reaction',
  templateUrl: './message-reaction.component.html',
  styleUrls: ['./message-reaction.component.scss']
})
export class MessageReactionComponent {
  @Input() withEditMessageOption: boolean = true; // edit message option only for own messages available
  showEditMessageButton: boolean = false;
  @Output() editMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() messageOfLoggedInUser: boolean = false;
  showEmojis: boolean = false;
  @Input() messageData: Message = new Message();
  @Input() clickedContact!: User;

  constructor(public ws: WorkspaceService, public us: UserService) { }

  editMessageButton() {
    this.showEditMessageButton = !this.showEditMessageButton;
  }

  editMessageButton1() {
    // Handle editMessageButton1
  }

  handUpReaction() {
    // Handle editMessageButton2
  }

  prepareToeditMessage() {
    this.showEditMessageButton = false;
    this.editMode.emit(true);
  }

  addEmoji($event: any) {
    debugger
    this.us.updateUser({ chats: this.addNewEmoji(this.clickedContact, $event.emoji.native) }, this.clickedContact);
    this.showEmojis = !this.showEmojis;
  }

  toggleBtn(target: string) {
    // debugger
    // this.showEmojis = target === 'emojis' ? !this.showEmojis : false;
    this.showEmojis = true;
  }

  addNewEmoji(forUser: User, emoji: any) {
    let allChats = [];

    for (let index = 0; index < forUser.chats!.length; index++) {
      const chat = forUser.chats![index];
      // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
      // so soll die neue Nachricht eingetragen werden.
      const messageDataMessageId = this.messageData.messageId;
      const chatMessageId = chat.messageId;
      if (chatMessageId === messageDataMessageId) {
        chat.emojis.push(emoji); // neu eingegebenes Emoji für Message
        allChats.push(chat);
        // für alle anderen Nachrichten die alte Nachricht übernehmen
      } else {
        allChats.push(chat);
      }
    }

    return allChats;
  }

  

}
