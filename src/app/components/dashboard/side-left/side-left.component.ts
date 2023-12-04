import { Component } from '@angular/core';
import { Channel } from 'src/app/interfaces/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent {
  arrowClickedChannels: boolean = false;
  arrowClickedContacts: boolean = false;  
  
  channelNames: string[] = ['Entwicklerteam', 'Office'];
  // contactsNames: string[] = ['Frederik', 'Hans Müller', 'Noah Braun', 'Josef Roth', 'test test', 'Noah Braun',];
  myUsers: any = [];
  myChannels: Channel[] = [];


  constructor(private us: UserService, public ws: WorkspaceService, private cs: ChannelService) {
    this.myUsers = this.us.allUsers;
    this.myChannels = this.cs.allChannels;
  }

  clickDownArrowChannels() {
    this.arrowClickedChannels = !this.arrowClickedChannels ? true : false;
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = !this.arrowClickedContacts ? true : false;
  }

}
