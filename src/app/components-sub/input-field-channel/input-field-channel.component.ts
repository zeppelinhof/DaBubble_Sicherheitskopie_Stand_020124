import { getLocaleTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';

import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss'],
})
export class InputFieldChannelComponent {
  showEmojis: boolean = false;
  showUserList: boolean = false;
  allMembers: any = [];
  clickedChannel!: Channel;
  allMessages: any = [];
  input: string = '';
  isInputSelected: boolean = false;
  
  constructor(public service: InputService, public cs: ChannelService, private us: UserService) {}

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
        userCustomId: 'pdvIa9XQgQtyB1pIqrwT', //'Frederik',
        message: this.input,
        createdTime: this.getTime(),
        emojis: [''],
      };

      this.cs.sendMessageToDB(newMessage, this.clickedChannel.customId);
      this.input = '';
    }
  }

  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }

  getTime(): string {
    const now: Date = new Date();
    const hours: string = ('0' + now.getHours()).slice(-2);
    const minutes: string = ('0' + now.getMinutes()).slice(-2);
    const timeString: string = `${hours}:${minutes}`;
    console.log(timeString);
    return timeString;
  }
  

  toggleBtn(target: string) {
    this.showEmojis = target === 'emojis' ? !this.showEmojis : false;
    this.showUserList = target === 'userList' ? !this.showUserList : false;
  }

  openFileExplorer(){
    console.log('openFileExplorer');
  }
}
