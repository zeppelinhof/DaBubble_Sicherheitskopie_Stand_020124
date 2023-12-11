import { Component } from '@angular/core';
import { Channel } from 'src/app/models/channel';

import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss'],
})
export class InputFieldChannelComponent {
  clickedChannel!: Channel;
  allMembers: any = [];
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
  // TODO: fix color of input field
  collectMemberFromList(item: any) {
    // this.isInputSelected = !this.isInputSelected;
    this.input += '@' + item;
    this.closeShowUserList();
  }

  closeShowUserList() {
    this.showUserList = false;
  }

  sendMessage() {
    let newMessage = { // {}
      user: 'ICH (USER)',
      message: this.input,
    };
    // ! muss geändert werden ! 
    this.cs.updateChannel({ allMessages: newMessage }, this.clickedChannel); 
  }
}
