import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
})
export class CreateChannelComponent {
  filteredMembers: User[] = [];
  channel!: Channel;

  constructor(
    public ws: WorkspaceService,
    private cs: ChannelService,
    private us: UserService
  ) {
    this.getUsers();
    this.getChannels();
  }

  getUsers(): User[] {
    return this.us.myUsers;
  }

  getChannels() {
    return this.cs.myChannels;
  }

  allFieldsFilled(): Boolean {
    if (this.channel) {   // diese Werte können vom Nutzer mehrfach für den Channel bei der Erstellung geändert werden
      this.channel.name = this.ws.inputName;
      this.channel.description = this.ws.inputDescription;
    } else {              // diese Werte werden nur einmal für den Channel gesetzt
      this.channel = new Channel('abc', this.ws.inputName, this.ws.inputDescription, [], this.cs.todaysDate(), new User('', 'Frederik', 'Beck', '', '', []))
      
      
    }
    return this.ws.inputName != '' && this.ws.inputDescription != '';
  }

  createChannel() {
    if (!this.ws.dialogGeneralData) {
      this.cs.sendDocToDB(this.channel);
      this.closeWindows();
      // this.cs.writeUserData(this.channel, '1234')
      this.channel = new Channel();
    } else {
      this.ws.dialogGeneralData = false;
    }
  }


  changeRadioButton() {
    return (this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true);
  }

  filterMembers() {
    this.ws.showAddMembers = true;
    const searchTerm = this.ws.inputMember.toLowerCase();

    this.filteredMembers = this.getUsers().filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      if (this.ws.showAddMembers) {
        this.refreshMemberList();
      }
      return (
        fullName.includes(searchTerm) &&
        !this.memberAlreadySelected(member.email)
      );
    });
  }

  memberAlreadySelected(email: string): boolean {
    const members = this.channel.members;
    if (members) {
      for (let index = 0; index < members.length; index++) {
        const ele = members[index].email;
        if (ele == email) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  addMember(user: User) {
    this.channel.members?.push(user);
  }

  removeMember(email: string) {
    const members = this.channel.members;
    if (members) {
      for (let index = 0; index < members.length; index++) {
        const member = members[index];
        if (member.email == email) {
          members.splice(index, 1);
        }
      }
    }
  }

  refreshMemberList() {
    setTimeout(() => {
      if (this.ws.showAddMembers) {
        this.filterMembers();
      }
    }, 1000);
  }

  clearChannelJSON() {
    this.channel = new Channel();
  }

  clearSearchInput() {
    this.ws.inputMember = '';
  }

  closeWindows() {
    this.ws.openCloseCreateChannel();
    this.ws.openCloseAddMembers();
  }

  addMembersFromFirstChannel() {
    if (this.getChannels()[0].members) {
      for (let index = 0; index < this.getChannels()[0].members.length; index++) {
        this.channel.members?.push(this.getChannels()[0].members[index]);
      }
      this.createChannel();
    }
  }
}
