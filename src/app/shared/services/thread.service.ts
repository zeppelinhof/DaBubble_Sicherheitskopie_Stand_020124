import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message';
import { WorkspaceService } from './workspace.service';
import { UserService } from './user.service';
import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from './channel.service';
import { Thread } from 'src/app/models/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  clickedMessage!: Message;

  constructor(private ws: WorkspaceService, private us: UserService, private cs: ChannelService) { }

  setTopicMessage(messageType: string, clickedContact: User, clickedChannel: Channel){
    let topicThread = this.us.getCleanThreadJson(new Thread(this.us.userLoggedIn().customId, this.clickedMessage.message, this.clickedMessage.emojis, this.clickedMessage.createdTime));
    debugger
    this.addThreadmessage(topicThread, messageType, clickedContact, clickedChannel, this.clickedMessage, this.clickedMessage)
  }

  addThreadmessage(thread: {}, messageType: string, clickedContact: User, clickedChannel: Channel, messageData: Message, data: Message) {
    // messageData kommt von Direktnachrichten; data von Channel-Nachrichten
    if (messageType == 'directMessage') {
      // this.us.updateUser({ threads: this.allThreadsWithNewThreadmessage(thread, clickedContact, messageType, messageData) }, clickedContact);
    } else {
      // this.cs.updateChannel({ allMessages: this.allThreadsWithNewThreadmessage(thread, clickedChannel, messageType, data) }, clickedChannel);
    }
    this.ws.showEmojis = !this.ws.showEmojis;
  }

  allThreadsWithNewThreadmessage(thread: Thread, chatroom: any, messageType: string, messageData: Message) {
    this.ws.allChatsTemp = [];

    const messagesArray = messageType === 'directMessage' ? chatroom.chats : chatroom.allMessages;

    if (messagesArray) {
      for (let index = 0; index < messagesArray.length; index++) {
        const chat = messagesArray[index];
        const messageDBId = chat.messageId;               // messageId from message in Database
        const messageClickedId = messageData.messageId;   // messageId from message clicked to add thread

        this.threatsWithNewThreat(thread, chat, messageClickedId, messageDBId);
      }
    }

    return this.ws.allChatsTemp;
  }


  threatsWithNewThreat(thread: Thread, chat: Message, messageClickedId: number, messageDBId: number) {
    // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
    // so soll die neue Nachricht eingetragen werden.

    if (messageDBId === messageClickedId) {
      chat.threads.push(thread); // neue Threadmessage

      this.ws.allChatsTemp.push(chat);
      // für alle anderen Nachrichten die alte Nachricht übernehmen
    } else {
      this.ws.allChatsTemp.push(chat);
    }
  }
}
