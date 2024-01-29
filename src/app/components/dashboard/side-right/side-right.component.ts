import { Component } from '@angular/core';
import { ThreadInterface } from 'src/app/interfaces/thread.interface';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';


@Component({
  selector: 'app-side-right',
  templateUrl: './side-right.component.html',
  styleUrls: ['./side-right.component.scss'],
})
export class SideRightComponent {

  threadsOfMessage!: ThreadInterface[];

  constructor(public ws: WorkspaceService,
    public ts: ThreadService,
    public cs: ChannelService,
    public respService: ResponsiveService) {}

  ngOnInit(): void {
    this.cs.threadsOfMessage
      .subscribe((threads: ThreadInterface[]) => {
        this.threadsOfMessage = threads;
      });
  }

}
