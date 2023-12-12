import { Component } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';

import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss'],
})
export class InputFieldChannelComponent {
  showEmojis: boolean = false;
  clickedChannel!: Channel;
  allMembers: any = [];
  allMessages: any = [];
  showUserList: boolean = false;
  input: string = '';
  isInputSelected: boolean = false;

  constructor(public service: InputService, public cs: ChannelService) {}

  ngOnInit(): void {
    this.getCurrentChannel();
  }

  // fills allMembers array with all users in the current channel
  getCurrentChannel() {
    this.cs.clickedChannel.subscribe((ch: Channel) => {
      this.clickedChannel = ch;
      this.allMembers = [];
      this.allMembers.push(this.clickedChannel.members);
    });
  }

  // adds a new member from current channel to the current input field
  collectMemberFromList(item: any) {
    this.input += '@' + item;
    this.closeShowUserList();
  }

  closeShowUserList() {
    this.showUserList = false;
  }

  // sends a new message to the current channel into allMessages array[]
  sendMessage() {
    let newMessage = new Message('', this.input, new Date(), ['']);
    this.allMessages.push(newMessage);
    console.log(this.allMessages);

    // this.cs.sendMessageToChannel(this.clickedChannel.customId, newMessage);
    this.cs.updateChannel(
      { allMessages: JSON.stringify(this.allMessages) },this.clickedChannel);
    
    // ! diese funktion muss am anfang aufgerufen werden.
    // ! stand jetzt ist am anfang kein channel zu sehen und deshalb, funktioniert
    // ! die abfrage mit der id des aktuellen channel's noch nicht.
    // * muss warscheinlich noch mit JSON.Parse um gewandelt werden und dann in array gepusht werden.
    setTimeout(() => {
      this.cs.getAllMessagesFromChannel(this.clickedChannel.customId);
    }, 5000);
  }
  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }
}
