import { Component, inject } from '@angular/core';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import {
  Firestore,
} from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss'],
})
export class SideLeftComponent {
  firestore: Firestore = inject(Firestore);
  arrowClickedChannels: boolean = false;
  arrowClickedContacts: boolean = false;
  rightArrowChannels: boolean = false;
  rightArrowContacts: boolean = false;

  myUserId: any = [];

  constructor(
    public us: UserService,
    public ws: WorkspaceService,
    public cs: ChannelService
  ) { }


  clickDownArrowChannels() {
    this.arrowClickedChannels = this.rightArrowChannels = !this.arrowClickedChannels;

    if (this.arrowClickedContacts) {
      this.arrowClickedContacts = !this.arrowClickedChannels; // Direktnachrichten-Ansicht schließen, wenn Channels-Ansicht geöffnet
    }
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = this.rightArrowContacts = !this.arrowClickedContacts;
    if (this.arrowClickedChannels) {
      this.arrowClickedChannels = !this.arrowClickedContacts; // Channels-Ansicht schließen, wenn Direktnachrichten-Ansicht geöffnet
    }
  }

}
