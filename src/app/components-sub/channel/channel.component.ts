import { Component } from '@angular/core';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { SearchInputService } from 'src/app/shared/services/search-input.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  clickedChannelId!: string;
  clickedChannel!: Channel;
  additionalMembers: User[] = [];
  previousAdded: boolean = false;

  infoVisible: boolean = false;
  editNameButton: boolean = true;
  editDescriptionButton: boolean = true;


  constructor(public ws: WorkspaceService, public cs: ChannelService, public sis: SearchInputService) { }

  ngOnInit(): void {
    this.cs.clickedChannelId
      .subscribe((chId: string) => {
        this.clickedChannelId = chId;
      });

    this.cs.clickedChannel
      .subscribe((ch: Channel) => {
        this.clickedChannel = ch;
      });
  }

  showInfo() {
    this.infoVisible = !this.infoVisible;
    this.editNameButton = true;
    this.editDescriptionButton = true;
  }

  switchShowAddMembersInExistingChannel() {
    this.ws.showAddMembersInExistingChannel = !this.ws.showAddMembersInExistingChannel;
    // Dropdown-Liste soll immer geschlossen werden, wenn Leute hinzufügen Fenster geschlossen wird
    if (!this.ws.showAddMembersInExistingChannel) {
      this.ws.showAddMembers = false;
    }
  }

  changeNameToInput() {
    this.editNameButton = !this.editNameButton;
  }

  changeDescriptionToInput() {
    this.editDescriptionButton = !this.editDescriptionButton;
  }

  removeMember(email: string) {
    debugger
    const members = this.additionalMembers;
    if (members) {
      for (let index = 0; index < members.length; index++) {
        const member = members[index];
        if (member.email == email) {
          members.splice(index, 1);
        }
      }
    }
  }

  addPreviousMembers() {
    // additionalMembers nimmt die zusätzlichen Members auf und fügt die bisherigen Members (einmal) hinzu
    debugger
    if (!this.previousAdded) {
      this.previousAdded = true;
      this.clickedChannel.members.forEach((member) => { this.additionalMembers.push(member) });
    }

  }

}
