import { ChannelService } from 'src/app/shared/services/channel.service';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { MessageOfUserComponent } from '../message-of-user/message-of-user.component';

@Component({
  selector: 'app-messages-channel',
  templateUrl: './messages-channel.component.html',
  styleUrls: ['./messages-channel.component.scss'],
  imports: [MessageOfUserComponent],
  standalone: true
})
export class MessagesChannelComponent {

  constructor(public cs: ChannelService, public storService: StorageService) {}
}
