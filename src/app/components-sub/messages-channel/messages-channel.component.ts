import { ChannelService } from 'src/app/shared/services/channel.service';

import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-messages-channel',
  templateUrl: './messages-channel.component.html',
  styleUrls: ['./messages-channel.component.scss'],
})
export class MessagesChannelComponent {

  constructor(public cs: ChannelService) {}
}
