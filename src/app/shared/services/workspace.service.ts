import { ElementRef, Injectable } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';
import { UserService } from './user.service';
import { Message } from 'src/app/models/message';
import { ChannelService } from './channel.service';
import { ThreadInterface } from 'src/app/interfaces/thread.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  showSideLeft: boolean = true;
  showCreateChannel: boolean = false;
  showAddMembers: boolean = false;
  showAddMembersInExistingChannel: boolean = false;
  dialogGeneralData: boolean = true;
  radioButtonFirst: boolean = true;
  inputName: string = '';
  inputDescription: string = '';
  inputMember: string = '';
  inputCertainMembers: User[] = [];
  allCurrentChannels: Channel[] = [];
  threadContainerIsVisible: boolean = true;
  showEmojis: boolean = false;
  allChatsTemp: any[] = [];
  indexChangedMessage!: number;

  constructor(private us: UserService, private cs: ChannelService) { }

  closeSideLeft() {
    this.showSideLeft = this.showSideLeft ? false : true;
  }

  openCloseCreateChannel() {
    this.showCreateChannel = this.showCreateChannel ? false : true;
    this.clearValues();
  }

  closeAddMembers() {
    this.showAddMembers = false;
    this.clearValues();
  }

  clearValues() {
    if (!this.showCreateChannel) {
      this.showCreateChannel = false;
      this.dialogGeneralData = true;
      this.radioButtonFirst = true;
      this.inputName = '';
      this.inputMember = '';
      this.inputDescription = '';
      this.inputCertainMembers = [];
      this.showAddMembers = false;
    }
  }

  addReaction(emojiPath: string, messageType: string, clickedContact: User, clickedChannel: Channel, messageData: Message, data: Message, threadMessageData: ThreadInterface) {
    // messageData kommt von Direktnachrichten; data von Channel-Nachrichten    
    if (messageType == 'directMessage') {
      // Chat beim Empfänger updaten   
      this.us.updateUser({ chats: this.allChatsWithNewEmoji(clickedContact, messageType, emojiPath, messageData) }, clickedContact);
      // Chat bei Sender updaten   
      this.us.updateUser({ chats: this.allChatsWithNewEmoji(this.us.userLoggedIn(), messageType, emojiPath, messageData) }, this.us.userLoggedIn());
    } else if (messageType == 'threadMessage') {
      this.cs.updateChannel({ allMessages: this.allChatsWithNewEmoji(clickedChannel, messageType, emojiPath, data, threadMessageData) }, clickedChannel);
    } else { // für Channel-Message
      this.cs.updateChannel({ allMessages: this.allChatsWithNewEmoji(clickedChannel, messageType, emojiPath, data) }, clickedChannel);
    }
    this.showEmojis = !this.showEmojis;
  }

  allChatsWithNewEmoji(chatroom: any, messageType: string, newEmojiPath: string, messageData: Message, threadMessageData?: ThreadInterface) {
    this.allChatsTemp = [];
    const messagesArray = messageType === 'directMessage' ? chatroom.chats : chatroom.allMessages;

    if (messagesArray) {
      this.checkIfThisChat(messagesArray, messageType, messageData, newEmojiPath, threadMessageData);
    }
    // Wenn Emoji für Thread
    if (threadMessageData) {
      this.allChatsTemp = this.threadUpdateEmoji(this.allChatsTemp, threadMessageData, newEmojiPath);
      // erster Thread (Topic-Thread) und Original-Channel-Nachricht sollen gleiche Emojis haben
      this.allChatsTemp[this.indexChangedMessage].threads[0].emojis = this.allChatsTemp[this.indexChangedMessage].emojis;
    }
    return this.allChatsTemp;
  }

  checkIfThisChat(messagesArray: any[], messageType: string, messageData: Message, newEmojiPath: string, threadMessageData?: ThreadInterface) {
    for (let index = 0; index < messagesArray.length; index++) {
      const chat = messagesArray[index];
      const messageDBId = chat.messageId;               // messageId from message in Database
      const messageClickedId = this.getMessageClickedId(messageType, messageData, threadMessageData)   // messageId from message clicked to add emoji

      this.chatWithNewEmoji(index, chat, messageClickedId, messageDBId, newEmojiPath);
    }
  }

  getMessageClickedId(messageType: string, messageData: Message, threadMessageData?: ThreadInterface) {
    if (messageType === 'threadMessage' && threadMessageData) {
      return threadMessageData.messageId;   // messageId from message clicked to add emoji
    } else {
      return messageData.messageId;   // messageId from message clicked to add emoji
    }
  }

  chatWithNewEmoji(index: number, chat: Message, messageClickedId: number, messageDBId: number, newEmojiPath: string) {
    // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
    // so soll die neue Nachricht eingetragen werden.
    if (messageDBId === messageClickedId) {
      this.indexChangedMessage = index;
      let emojiPathIndex = this.emojiAlreadyExists(chat.emojis, newEmojiPath);

      chat = this.addOrRemoveEmoji(chat, emojiPathIndex, newEmojiPath);

      this.allChatsTemp.push(chat);
      // für alle anderen Nachrichten die alte Nachricht übernehmen
    } else {
      this.allChatsTemp.push(chat); // ganze Channel-Nachricht oder Direktnachricht übernehmen
    }
  }

  threadUpdateEmoji(allChatsTemp: any[], threadMessageData: ThreadInterface, newEmojiPath: string) {
    for (let chat of allChatsTemp) {
      if (chat.messageId === this.cs.threadsOfMessage.value[0].messageId) {
        for (let thread of chat.threads) {
          if (thread.messageId === threadMessageData.messageId) {
            let refreshedThread = this.getRefreshedThread(threadMessageData, newEmojiPath)
            chat.threads[chat.threads.indexOf(thread)] = refreshedThread;
            if (this.isTopicMessage(chat, thread)) {
              // erster Thread (Topic-Thread) und Original-Channel-Nachricht sollen gleiche Emojis haben
              chat.emojis = refreshedThread.emojis;
            }

          }
        }
      }
    }
    return allChatsTemp;
  }

  getRefreshedThread(threadMessageData: ThreadInterface, newEmojiPath: string) {
    let emojiPathIndex = this.emojiAlreadyExists(threadMessageData.emojis, newEmojiPath);
    return this.addOrRemoveEmoji(threadMessageData, emojiPathIndex, newEmojiPath);
  }

  isTopicMessage(chat: Message, thread: ThreadInterface) {
    return chat.threads.indexOf(thread) === 0;
  }

  emojiAlreadyExists(emojis: { path: string, amount: number, setByUser: string[] }[], newEmojiPath: string): number {
    return emojis.findIndex(emoji => emoji.path === newEmojiPath);
  }

  addOrRemoveEmoji(chat: any, emojiPathIndex: number, newEmojiPath: string) {
    const settingUser = this.us.userLoggedIn().customId;

    if (emojiPathIndex === -1) {
      // Neues Emoji hinzufügen
      const newEmoji = { path: newEmojiPath, amount: 1, setByUser: [settingUser] };
      chat.emojis.push(newEmoji);
    } else {
      const setByUserArray = chat.emojis[emojiPathIndex].setByUser;

      if (!setByUserArray.includes(settingUser)) {
        // Emoji hinzufügen
        setByUserArray.push(settingUser);
        chat.emojis[emojiPathIndex].amount = setByUserArray.length;
      } else {
        // Emoji entfernen
        const userIndex = setByUserArray.indexOf(settingUser);
        if (userIndex !== -1) {
          chat.emojis[emojiPathIndex].setByUser.splice(userIndex, 1);
          chat.emojis[emojiPathIndex].amount = setByUserArray.length;
        }
      }
    }

    return chat;
  }


}