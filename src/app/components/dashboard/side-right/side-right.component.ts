import { Component } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-side-right',
  templateUrl: './side-right.component.html',
  styleUrls: ['./side-right.component.scss'],
})
export class SideRightComponent {
  constructor(public ws: WorkspaceService, 
    public ts: ThreadService,
    public cs: ChannelService) {
    setInterval(() => {
      // console.log("neu",this.ws.threadContainerIsVisible);
    }, 500);
  }
}
