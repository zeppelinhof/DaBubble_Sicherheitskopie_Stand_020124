import { Component } from '@angular/core';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {

  constructor(public ws: WorkspaceService){}
 
}
