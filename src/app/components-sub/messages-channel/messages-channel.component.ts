import { ChannelService } from 'src/app/shared/services/channel.service';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-messages-channel',
  templateUrl: './messages-channel.component.html',
  styleUrls: ['./messages-channel.component.scss'],
})
export class MessagesChannelComponent {

  constructor(public cs: ChannelService, public storService: StorageService) {}
}
