import { Component, Input } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { ThreadInterface } from 'src/app/interfaces/thread.interface';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-message-of-user',
  templateUrl: './message-of-user.component.html',
  styleUrls: ['./message-of-user.component.scss']
})
export class MessageOfUserComponent {
  @Input() messageData: Message = new Message();      // für Direktnachrichten
  @Input() data: Message = new Message();             // für Channelnachrichten
  @Input() threadMessageData!: ThreadInterface;       // für Threadnachrichten

  @Input() messageType: string = 'channel';
  getEditMode: boolean = false;
  showReactionChoice: boolean = false;
  previousMessage: string = '';
  clickedContact!: User;
  clickedChannel!: Channel;
  unsubAllUsers: any;
  threadsOfMessage!: ThreadInterface[];

  constructor(public us: UserService,
    public cs: ChannelService,
    public ws: WorkspaceService,
    public storService: StorageService,
    public ts: ThreadService,
    public is: InputService) { }

  ngOnInit(): void {
    this.unsubAllUsers = this.us.subAllUsersListFindUserName();
    this.getCurrentUser();
    this.getCurrentChannel();
    this.savePreviousMessage();

    this.cs.threadsOfMessage
      .subscribe((threads: ThreadInterface[]) => {
        this.threadsOfMessage = threads;
      });
  }

  savePreviousMessage() {
    this.previousMessage = this.data.message || this.messageData.message;
  }

  reactionChoice(show: boolean) {
    this.showReactionChoice = show;
  }

  receiveValueFromChild(value: boolean) {
    // Wert von Kindkomponente erhaltenen
    this.getEditMode = value;
  }

  hasAnswers() {
    // nur anzeigen wenn außer Thema auch eine Antwort existiert
    if (this.data.threads) {
      return this.data.threads.length > 1;
    }
    return false;
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
    if (this.messageType === 'directMessage') {
      this.saveDirectMessage();
    }
    else if (this.messageType === 'channelMessage') {
      this.saveChannelMessage();
    } else if (this.messageType === 'threadMessage') {
      this.saveThreadMessage();
    } else {
      console.log('Speichern nicht erfolgreich');
    }
    this.closeEditWindow();
  }

  saveDirectMessage() {
    // Nachricht bei Empfänger hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(this.clickedContact) }, this.clickedContact);
    // Nachricht bei Sender hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(this.us.userLoggedIn()) }, this.us.userLoggedIn());
  }

  saveChannelMessage() {
    this.cs.updateChannel({ allMessages: this.insertNewMessageIntoMessages(this.clickedChannel) }, this.clickedChannel);
  }

  saveThreadMessage() {
    this.cs.updateChannel({ allMessages: this.insertNewThreadIntoMessages() }, this.clickedChannel);
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
      // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
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

  insertNewMessageIntoMessages(forChannel: Channel): Message[] {
    let allChats: Message[] = [];
    //getAllMessagesOfChannel
    for (let index = 0; index < forChannel.allMessages!.length; index++) {
      const chat = forChannel.allMessages![index];
      // wenn die messageId der alten Nachticht gleich der messageId der bearbeiteten Nachricht ist
      // so soll die neue Nachricht eingetragen werden.
      const dataMessageId = this.data.messageId;
      const chatMessageId = chat.messageId;

      allChats = this.refreshedChats_newMessage(dataMessageId, chatMessageId, chat, allChats);
    }
    return allChats;
  }

  refreshedChats_newMessage(dataMessageId: number, chatMessageId: number, chat: Message, allChats: Message[]) {
    if (chatMessageId === dataMessageId) {
      chat.message = this.data.message; // neu eingegebener Wert für Message
      if (chat.threads[0]) {
        // erster Thread (Topic-Thread) und Original-Channel-Nachricht sollen gleichen Text haben
        chat.threads[0].answer = chat.message;
      }
      allChats.push(chat);
      // für alle anderen Nachrichten die alte Nachricht übernehmen
    } else {
      allChats.push(chat);
    }
    return allChats;
  }


  insertNewThreadIntoMessages() {
    let allChats: Message[] = [];
    //getAllMessagesOfChannel
    for (let index = 0; index < this.clickedChannel.allMessages!.length; index++) {
      // Nachricht über messageId ermitteln
      const chat = this.clickedChannel.allMessages![index];
      const dataMessageId = this.cs.clickedMessage.value.messageId;
      const chatMessageId = chat.messageId;
      allChats = this.refreshedChats_newThread(dataMessageId, chatMessageId, chat, allChats);
    }
    return allChats;
  }

  refreshedChats_newThread(dataMessageId: number, chatMessageId: number, chat: Message, allChats: Message[]): Message[] {
    if (chatMessageId === dataMessageId) {
      let allThreads: ThreadInterface[] = [];
      chat.threads = this.refreshedThreads(allThreads);
      // erster Thread (Topic-Thread) und Original-Channel-Nachricht sollen gleichen Text haben
      chat.message = chat.threads[0].answer;
      allChats.push(chat);
    } else {
      allChats.push(chat);
    }
    return allChats;
  }

  refreshedThreads(allThreads: ThreadInterface[]): ThreadInterface[] {
    for (let inTh = 0; inTh < this.threadsOfMessage.length; inTh++) {
      const thread = this.threadsOfMessage[inTh];
      if (thread.messageId === this.threadMessageData.messageId) {
        // neue Nachricht eingetragen
        thread.answer = this.threadMessageData.answer;
        allThreads.push(thread);
      } else {
        allThreads.push(thread);
      }
    }
    return allThreads;
  }

  checkIfOwnMessage(): boolean {
    if (this.messageData.userCustomId) {
      return this.messageData.userCustomId == this.us.userLoggedIn().customId;
    } else if (this.data.userCustomId && !this.threadMessageData) {
      return this.data.userCustomId == this.us.userLoggedIn().customId;
    } else if (this.threadMessageData && this.threadMessageData.userCustomId) {
      return this.threadMessageData.userCustomId == this.us.userLoggedIn().customId;
    }
    return false;
  }


}