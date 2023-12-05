import { Component, OnInit, inject } from '@angular/core';
import { Channel } from 'src/app/interfaces/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { Firestore, collection, query, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  arrowClickedChannels: boolean = false;
  arrowClickedContacts: boolean = false;
  rightArrowChannels: boolean= false;
  rightArrowContacts: boolean= false;

  myUsers: any = [];
  myChannels: Channel[] = [];


  constructor(private us: UserService, public ws: WorkspaceService, private cs: ChannelService) {
    this.myUsers = this.us.allUsers;
  }

  ngOnInit(): void {
      const q = query(collection(this.firestore, 'channels'));
      onSnapshot(q, (querySnapshot) => {
        this.myChannels = [];
        querySnapshot.forEach((element) => {
          this.myChannels.push(this.cs.setChannelObject(element.data(), element.id));
        });
      });
  }

  clickDownArrowChannels() {
    this.arrowClickedChannels = this.rightArrowChannels = (!this.arrowClickedChannels ? true : false);  
  }

  clickDownArrowContacts() {
    this.arrowClickedContacts = this.rightArrowContacts = !this.arrowClickedContacts ? true : false;
  }

}
