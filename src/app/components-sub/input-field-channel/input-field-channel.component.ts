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


  sendMessage() {
    let newMessage: Message = {
      userCustomId: '',
      message: this.input,
      createdTime: new Date(),
      emojis: [''],
    }
    this.allMessages.push(newMessage);
    this.cs.updateChannel({ allMessages: this.allMessages },this.clickedChannel);
    this.getMessagesFromDB();
  }


  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }


  getMessagesFromDB() {
    this.cs.getAllMessagesFromChannel(this.clickedChannel.customId);
    console.log("in all message:" ,this.cs.allMessagesChannel);
    
  }
}