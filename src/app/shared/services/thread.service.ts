import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message';
import { WorkspaceService } from './workspace.service';
import { UserService } from './user.service';
import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from './channel.service';
import { MessageTime } from 'src/app/models/message-time';
import { ThreadInterface } from 'src/app/interfaces/thread.interface';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  clickedMessage!: Message;
  clickedChannel!: Channel;
  threadVisible: boolean = false;

  constructor(private ws: WorkspaceService, private us: UserService, private cs: ChannelService) { }

  setTopicMessage() {
    let topicThread =
    {
      userCustomId: this.us.userLoggedIn().customId,
      messageId: this.clickedMessage.messageId,
      answer: this.clickedMessage.message,
      emojis: this.clickedMessage.emojis,
      createdTime: this.clickedMessage.createdTime
    }
    this.addThreadmessage(topicThread, this.clickedChannel, this.clickedMessage);
    this.threadVisible = true;
  }

  addThreadAnswer(input: string) {
    let threadAnswer =
    {
      userCustomId: this.us.userLoggedIn().customId,
      messageId: Date.now(),
      answer: input,
      emojis: [{path: '', amount: 0, setByUser: ''}],
      createdTime: this.cs.getCleanMessageTimeJson(
        new MessageTime(
          new Date().getDate(),
          this.cs.todaysDate(),
          this.cs.getTime(),
        )
      )
    }

    this.addThreadmessage(threadAnswer, this.clickedChannel, this.clickedMessage);
  }

  addThreadmessage(thread: ThreadInterface, clickedChannel: Channel, msgDta: Message) {
    // messageData kommt von Direktnachrichten; msgDta von Channel-Nachrichten
    debugger
    this.cs.updateChannel({ allMessages: this.allThreadsWithNewThreadmessage(thread, clickedChannel, msgDta) }, clickedChannel);

    this.ws.showEmojis = !this.ws.showEmojis;
  }

  allThreadsWithNewThreadmessage(thread: ThreadInterface, chatroom: any, messageData: Message) {
    this.ws.allChatsTemp = [];
debugger
    if (chatroom.allMessages) {
      for (let index = 0; index < chatroom.allMessages.length; index++) {
        const chat = chatroom.allMessages[index];
        const messageDBId = chat.messageId;               // messageId from message in Database
        const messageClickedId = messageData.messageId;   // messageId from message clicked to add thread

        this.threatsWithNewThreat(thread, chat, messageClickedId, messageDBId);
      }
    }

    return this.ws.allChatsTemp;
  }

  threatsWithNewThreat(thread: ThreadInterface, chat: Message, messageClickedId: number, messageDBId: number) {
    // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
    // so soll die neue Nachricht eingetragen werden.

    if (messageDBId === messageClickedId) {
      chat.threads.push(thread); // neue Threadmessage
      let chatWithNewThreat = chat;

      this.ws.allChatsTemp.push(chatWithNewThreat);
      // für alle anderen Nachrichten die alte Nachricht übernehmen
    } else {
      this.ws.allChatsTemp.push(chat);
    }
  }

}