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
  clickedChannelId!: string;
  clickedChannel!: Channel;


  constructor(public ws: WorkspaceService, public cs: ChannelService) { }

  ngOnInit(): void {
    this.cs.clickedChannelId
      .subscribe((chId: string) => {
        this.clickedChannelId = chId;
        console.log('Komponente Channel hat folgende Id erhalten:', chId)
      });
  }  

}
