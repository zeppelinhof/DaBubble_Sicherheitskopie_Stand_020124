import { Injectable } from '@angular/core';
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
  threadContainerIsVisible: boolean = false;
  showEmojis: boolean = false;
  allChatsTemp: any[] = [];
  indexChangedMessage!: number;

  // Global Search
  globalResults: boolean = false;
  inputGlobalSearch: string = '';
  messageToSearch: any;

  constructor(private us: UserService, private cs: ChannelService) { }

  // #region get Channels and Users
  getUsers() {
    // Es werden nur die User angezeigt, welche in ihrem Chat die customId von Logged In User haben 
    // Also: Diejenigen, welche von Logged In User angeschrieben wurden
    const filteredUsers = this.us.myUsers.filter((user: User) => {
      if (this.us.userLoggedIn().chats && user.chats) {
        return user.chats.some((chat: Message) => chat.userCustomId === this.us.userLoggedIn().customId);
      } else {
        return [];
      }
    });

    // diejenigen, welche Logged In User angeschrieben haben, ohne dass Logged User diese zuvor angeschrieben hat, werden nun auch hinzugefügt
    for (let index = 0; index < this.us.userLoggedIn().chats!.length; index++) {
      const userLoggedInChats = this.us.userLoggedIn().chats![index];
      let alreadyIncluded: boolean = false;
      for (let index = 0; index < filteredUsers.length; index++) {
        const filteredUser = filteredUsers[index];
        if (userLoggedInChats.userCustomId === filteredUser.customId) {
          alreadyIncluded = true;
        }
      }
      if (!alreadyIncluded) {
        const userToAdd = this.us.myUsers.find((user: User) => user.customId === userLoggedInChats.userCustomId);
        if (userToAdd) {
          // falls noch
          filteredUsers.push(userToAdd);
        }
      }

    }
    return filteredUsers;
  }

  getChannels() {
    // User logged in: hier sei vorläufig User logged in Markus mit Id 5oDYsPkUGMb9FPqmqNGB
    // Es werden nur Channels angezeigt, in denen User Logged in ein Member ist  
    // (some wird verwendet, um zu überprüfen, ob mindestens ein Element im Array members die Bedingung erfüllt)    
    if (this.cs.myChannels) {
      const onlyMyChannels = this.cs.myChannels.filter((channel: Channel) =>
        channel.members.some((member: User) => member.customId === this.us.userLoggedIn().customId)
      );
      return onlyMyChannels;
    }
  }

  getNameOfChannel(idForName: string) {
    let channelName = this.getChannels().find((channel: Channel) => channel.customId === idForName);
    return channelName.name;
  }

  // #endregion

  closeSideLeft() {
    this.showSideLeft = this.showSideLeft ? false : true;
  }

  openCloseCreateChannel() {
    this.showCreateChannel = this.showCreateChannel ? false : true;
    this.addMemberClearValues();
  }

  closeAddMembers() {
    this.showAddMembers = false;
    this.addMemberClearValues();
  }

  closeGlobalResults() {
    this.globalResults = false;
  }

  addMemberClearValues() {
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

  //#region addReatcion
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
  // #endregion

  scrollToBottom(elementId: string) {    
    setTimeout(() => {
      let element = document.getElementById(elementId);
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 300)
  }

  // für Global Search
  scrollToElementByContent(content: string, type: string) {        
    // zu Threadnachricht scrollen
    if (type === 'threadMessage') {
      let sideRightContainer = document.getElementsByClassName('side-right-container');
      let elements = sideRightContainer[0].getElementsByClassName('thread-message-container');

      for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.textContent && element.textContent.toLowerCase().includes(content.trim())) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
      // zu Direktnachricht oder Channelnachricht scrollen
    } else {
      let elements = document.getElementsByClassName('thread-message-container');

      for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element.textContent && element.textContent.toLowerCase().includes(content.trim())) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    }
  }

  scrollToMessage(messageId: string) {
    const element = document.getElementById(messageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // um Überlauf in Bubbles zu vermeiden, werden lange Worte nach dem 25. Zeichen (charMax) aufgetrennt
  separateLongWords(input: string): string {
    let charMax = 25;
    const words = input.split(' ');
  
    const modifiedWords = words.map(word => {
      if (word.length > charMax) {
        return word.slice(0, charMax) + '- ' + this.separateLongWords(word.slice(charMax)); // falls Rest immer noch zu lang -> nochmals trennen
      }
      return word;
    });
  
    return modifiedWords.join(' ');
  }
  
}