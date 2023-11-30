import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent {
  channelNames: string[] = ['Entwicklerteam', 'Office'];
  contactsNames: string[] = ['Frederik', 'Hans Müller', 'Noah Braun', 'Josef Roth', 'test test', 'Noah Braun',];
  myUsers: any = [];


  constructor(private service: UserService) {
    this.myUsers = this.service.allUsers// getting allUsers from user.service.ts 
    console.log(this.myUsers);


  }

  arrowClickedChannels: boolean = false;
  arrowClickedContacts: boolean = false;

  clickDownArrowChannels() {
    this.arrowClickedChannels = !this.arrowClickedChannels ? true : false;
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = !this.arrowClickedContacts ? true : false;
  }

}
