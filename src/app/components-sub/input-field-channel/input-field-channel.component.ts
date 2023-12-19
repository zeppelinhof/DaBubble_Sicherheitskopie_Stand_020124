import { getLocaleTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';

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

  sendMessage() {
    if (this.input !== '') {
      let newMessage: Message = {
        userCustomId: '',
        message: this.input,
        createdTime: this.getTime(),
        emojis: [''],
      };

      this.cs.sendMessageToDB(newMessage, this.clickedChannel.customId);
      this.input = '';
    } else{
      console.log("You can't send an empty message");
    }
  }

  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }

  getTime() {
    const jetzt: Date = new Date();
    const stunden: number = jetzt.getHours();
    const minuten: number = jetzt.getMinutes();

    const stundenString: string =
      stunden < 10 ? '0' + stunden : stunden.toString();
    const minutenString: string =
      minuten < 10 ? '0' + minuten : minuten.toString();

    const uhrzeitString: string = `${stundenString}:${minutenString}`;
    console.log(uhrzeitString);
    return uhrzeitString;
  }
}
