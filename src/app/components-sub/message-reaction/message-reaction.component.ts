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
  moreReactions: boolean = false;

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

  addEmoji(emojiPath: string) {
    this.us.updateUser({ chats: this.addNewEmoji(this.clickedContact, emojiPath) }, this.clickedContact);
    this.showEmojis = !this.showEmojis;
  }

  addNewEmoji(forUser: User, newEmojiPath: string) {
    let allChats = [];
    for (let index = 0; index < forUser.chats!.length; index++) {
      const chat = forUser.chats![index];
      // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
      // so soll die neue Nachricht eingetragen werden.
      const messageDataMessageId = this.messageData.messageId;
      const chatMessageId = chat.messageId;
      if (chatMessageId === messageDataMessageId) {
        let emojiPathIndex = this.emojiAlreadyExits(chat.emojis, newEmojiPath);
        if (emojiPathIndex == -1) {
          chat.emojis.push({ path: newEmojiPath, amount: 1, setByUser: this.us.userLoggedIn().customId }); // neu eingegebener Emojipfad für Message
         // wenn das Emoji bereits existiert und eingeloggter User noch nicht dieses Emoji vergeben hat, dann Anzahl erhöhen
        } else if(chat.emojis[emojiPathIndex]['setByUser'] !== this.us.userLoggedIn().customId) {
          chat.emojis[emojiPathIndex].amount = chat.emojis[emojiPathIndex]['amount'] + 1;
        }
        allChats.push(chat);
        // für alle anderen Nachrichten die alte Nachricht übernehmen
      } else {
        allChats.push(chat);
      }
    }

    return allChats;
  }

  emojiAlreadyExits(emojis: { path: string, amount: number, setByUser: string }[], newEmojiPath: string): number {

    for (let emojiPathIndex = 0; emojiPathIndex < emojis.length; emojiPathIndex++) {
      const emoji = emojis[emojiPathIndex];
      if (emoji.path == newEmojiPath) {
        return emojiPathIndex;
      }
    }
    return -1;
  }
  showMoreReactions() {
    this.moreReactions = !this.moreReactions;
  }



}
