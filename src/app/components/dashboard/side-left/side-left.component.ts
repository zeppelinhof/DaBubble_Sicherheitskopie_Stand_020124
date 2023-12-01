import { Component } from '@angular/core';
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


  constructor(private service: UserService, public ws: WorkspaceService) {
    this.myUsers = this.service.allUsers// getting allUsers from user.service.ts 
    console.log(this.myUsers);
  }

  clickDownArrowChannels() {
    this.arrowClickedChannels = !this.arrowClickedChannels ? true : false;
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = !this.arrowClickedContacts ? true : false;
  }

}
