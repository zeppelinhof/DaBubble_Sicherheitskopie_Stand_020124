import { Injectable, ViewChild } from '@angular/core';
import { Message } from 'src/app/models/message';

import { UserService } from './user.service';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from './channel.service';
import { MessageTime } from 'src/app/models/message-time';
import { ThreadInterface } from 'src/app/interfaces/thread.interface';
import { StorageService } from './storage.service';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { Router } from '@angular/router';
import { WorkspaceService } from './workspace.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  clickedChannel!: Channel;
  threadVisible: boolean = false;

  constructor(private ws: WorkspaceService, private router: Router, private us: UserService, private cs: ChannelService, public storService: StorageService, private resService: ResponsiveService) { }

  /**
   * Setzt die Topic-Nachricht für den aktuellen Thread.
   */
  setTopicMessage() {
    let topicThread: ThreadInterface =
    {
      userCustomId: this.cs.clickedMessage.value.userCustomId,
      messageId: this.cs.clickedMessage.value.messageId,
      answer: this.cs.clickedMessage.value.message,
      emojis: this.cs.clickedMessage.value.emojis,
      createdTime: this.cs.clickedMessage.value.createdTime,
      file: this.cs.clickedMessage.value.file
    }

    this.addThreadmessage(topicThread, this.cs.clickedChannel.value, this.cs.clickedMessage.value);
    this.threadVisible = true;
  }

  /**
   * Erstellt oder zeigt den Thread für die angegebene Nachricht.
   * @param data - Die Nachricht, für die der Thread erstellt oder angezeigt werden soll.
   */
  createOrShowThread(data: Message) {
    this.cs.clickedMessage.next(data);
    this.clickedChannel = this.clickedChannel;
    // Topic Message nur dann, wenn noch keine vorhanden
    if (data.threads.length === 0) {
      this.setTopicMessage();
    }
    // this.resService.closeRouter();

  }

  /**
   * Zeigt alle Threads für die angegebene Nachricht.
   * @param data - Die Nachricht, für die die Threads angezeigt werden sollen.
   */
  showThreads(data: Message) {
    this.ws.threadContainerIsVisible = true;
    this.cs.clickedMessage.next(data);
    this.cs.subThreadList();
    this.threadVisible = true;
  }

  /**
   * Fügt eine Thread-Antwort basierend auf dem angegebenen Eingabewert hinzu.
   * @param input - Die Eingabe für die Thread-Antwort.
   */
  addThreadAnswer(input: string) {
    let threadAnswer: ThreadInterface =
    {
      userCustomId: this.us.userLoggedIn().customId,
      messageId: Date.now(),
      answer: input,
      emojis: [{ path: '', amount: 0, setByUser: [''] }],
      createdTime: this.cs.getCleanMessageTimeJson(
        new MessageTime(
          new Date().getDate(),
          this.cs.todaysDate(),
          this.cs.getTime(),
        )
      ),
      file: this.storService.getUrlFromStorage(),
    }

    this.addThreadmessage(threadAnswer, this.clickedChannel, this.cs.clickedMessage.value);
  }

  /**
   * Fügt eine Thread-Nachricht hinzu.
   * @param thread - Das Thread-Objekt, das hinzugefügt werden soll.
   * @param clickedChannel - Das ausgewählte Channel-Objekt.
   * @param msgDta - Die Nachricht, für die der Thread hinzugefügt wird.
   */
  addThreadmessage(thread: ThreadInterface, clickedChannel: Channel, msgDta: Message) {
    // messageData kommt von Direktnachrichten; msgDta von Channel-Nachrichten
    this.cs.updateChannel({ allMessages: this.allThreadsWithNewThreadmessage(thread, clickedChannel, msgDta) }, clickedChannel);

    this.ws.showEmojis = !this.ws.showEmojis;
  }

  /**
   * Gibt alle Nachrichten mit der neuen Thread-Nachricht zurück.
   * @param thread - Das Thread-Objekt, das hinzugefügt werden soll.
   * @param chatroom - Das Chatroom-Objekt.
   * @param messageData - Die Nachricht, für die der Thread hinzugefügt wird.
   * @returns Ein Array mit allen Nachrichten, einschließlich der neuen Thread-Nachricht.
   */
  allThreadsWithNewThreadmessage(thread: ThreadInterface, chatroom: any, messageData: Message) {
    this.ws.allChatsTemp = [];
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

  /**
   * Verarbeitet die Threads mit der neuen Thread-Nachricht.
   * @param thread - Das Thread-Objekt, das hinzugefügt werden soll.
   * @param chat - Die Chat-Nachricht, die überprüft wird.
   * @param messageClickedId - Die Nachrichten-ID, für die der Thread hinzugefügt wird.
   * @param messageDBId - Die Datenbank-ID der Nachricht.
   */
  threatsWithNewThreat(thread: ThreadInterface, chat: Message, messageClickedId: number, messageDBId: number) {
    // wenn die messageId der alten Nachricht gleich der messageId der bearbeiteten Nachricht ist
    // so soll die neue Nachricht eingetragen werden.

    if (messageDBId === messageClickedId) {
      // beim ersten Thread ist das Feld threads undefined
      if (chat.threads == undefined) {
        chat.threads = [thread];
        let chatWithNewThreat = chat;
        this.ws.allChatsTemp.push(chatWithNewThreat);
      } else {
        chat.threads.push(thread); // neue Threadmessage
        let chatWithNewThreat = chat;
        this.ws.allChatsTemp.push(chatWithNewThreat);
      }
      // für alle anderen Nachrichten die alte Nachricht übernehmen
    } else {
      this.ws.allChatsTemp.push(chat);
    }
  }

}