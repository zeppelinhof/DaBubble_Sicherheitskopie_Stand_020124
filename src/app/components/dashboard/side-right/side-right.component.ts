import { Component } from '@angular/core';
import { InputFieldThreadComponent } from 'src/app/components-sub/input-field-thread/input-field-thread.component';
import { MessageOfUserComponent } from 'src/app/components-sub/message-of-user/message-of-user.component';
import { ThreadInterface } from 'src/app/interfaces/thread.interface';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-side-right',
  templateUrl: './side-right.component.html',
  styleUrls: ['./side-right.component.scss'],
  imports: [InputFieldThreadComponent, MessageOfUserComponent, HeaderComponent],
  standalone: true
})
export class SideRightComponent {

  threadsOfMessage = this.cs.threadsOfMessage;

  constructor(public ws: WorkspaceService,
    public ts: ThreadService,
    public cs: ChannelService,
    public respService: ResponsiveService) {}

}
