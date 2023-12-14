import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { SearchInputService } from 'src/app/shared/services/search-input.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
})
export class CreateChannelComponent {

  constructor(
    public ws: WorkspaceService,
    public cs: ChannelService,    
    public sis: SearchInputService
  ) {}  

  changeRadioButton() {
    return (this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true);
  }
}
