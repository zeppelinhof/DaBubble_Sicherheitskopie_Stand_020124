import { ChannelService } from 'src/app/shared/services/channel.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-messages-channel',
  templateUrl: './messages-channel.component.html',
  styleUrls: ['./messages-channel.component.scss'],
})
export class MessagesChannelComponent {
  array: any[] = [
    { text: 'Messages' },
    { text: 'Messages' },
    { text: 'Messages' },
  ];
  constructor(public cs: ChannelService) {
    console.log(this.array);
    
  }
}
