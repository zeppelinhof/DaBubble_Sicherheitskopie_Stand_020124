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
  all: any = [];
  showUserList: boolean = false;
  constructor(public service: InputService, public cs: ChannelService) {}

  ngOnInit(): void {
    this.cs.clickedChannel.subscribe((ch: Channel) => {
      this.clickedChannel = ch;
      this.allMembers = [];
      this.allMembers.push(this.clickedChannel.members);
    });
  }
}
