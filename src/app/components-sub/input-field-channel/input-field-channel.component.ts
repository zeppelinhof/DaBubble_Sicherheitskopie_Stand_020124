import { getLocaleTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { MessageTime } from 'src/app/models/message-time';
import { Thread } from 'src/app/models/thread';

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

  constructor(
    public service: InputService,
    public cs: ChannelService,
    private us: UserService
  ) {}

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
        createdTime: this.cs.getCleanMessageTimeJson(
          new MessageTime(
            new Date().getDate(),
            this.cs.todaysDate(),
            this.cs.getTime(),
            Date.now()
          )
        ),
        emojis: [''],
        threads: [],
      };
      console.log('this is newmessage', newMessage);

      this.cs.sendMessageToDB(newMessage, this.clickedChannel.customId);
      this.input = '';
    }
  }

  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }

  toggleBtn(target: string) {
    this.showEmojis = target === 'emojis' ? !this.showEmojis : false;
    this.showUserList = target === 'userList' ? !this.showUserList : false;
  }

  openFileExplorer() {
    console.log('openFileExplorer');
  }
}
