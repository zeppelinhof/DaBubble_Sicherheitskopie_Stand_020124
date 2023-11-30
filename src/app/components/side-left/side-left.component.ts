import { Component } from '@angular/core';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent {
  channelNames: string[] = ['Entwicklerteam', 'Office'];
  contactsNames: string[] = ['Frederik', 'Hans Müller', 'Noah Braun', 'Josef Roth'];
  arrowClickedChannels: boolean = false;
  arrowClickedContacts: boolean = false;

  clickDownArrowChannels() {
    this.arrowClickedChannels = !this.arrowClickedChannels ? true : false;
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = !this.arrowClickedContacts ? true : false;
  }

}
