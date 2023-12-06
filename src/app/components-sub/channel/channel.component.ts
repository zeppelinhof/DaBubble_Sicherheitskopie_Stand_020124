import { Component } from '@angular/core';
import { Channel } from 'src/app/interfaces/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  currentChannelId!: string;

  constructor(public ws: WorkspaceService, public cs: ChannelService) { }

  // getChannel(): any {
  //   if (this.cs.clickedChannel) {
  //     this.currentChannel = this.cs.clickedChannel.value;
  //     return this.currentChannel;
  //   }
  //   return '';
  // }

  ngOnInit(): void {
    this.cs.clickedChannelId
      .subscribe((chId: string) => {
        this.currentChannelId = chId;
        debugger
      });
  }  

}
