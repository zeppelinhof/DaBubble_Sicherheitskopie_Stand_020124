import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { User } from 'src/app/interfaces/user';
import { Channel } from 'src/app/interfaces/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import {
  Firestore,
  collection,
  onSnapshot,
  query,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
})
export class CreateChannelComponent {
  filteredMembers: User[] = [];
  membersSelected: string[] = [];
  channel: Channel = {
    customId: '',
    name: '',
    description: '',
    members: [],
    createdDate: '',
  };

  

  constructor(
    private service: UserService,
    public ws: WorkspaceService,
    private cs: ChannelService,
    private firestore: Firestore,
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
    this.channel.name = this.ws.inputName;
    this.channel.description = this.ws.inputDescription;
    this.channel.createdBy = {
      custId: '',
      img: '',
      firstName: 'Frederick',
      lastName: 'Beck',
      email: '',
      password: '',
    };
    this.channel.customId = 'tbd';
    this.channel.createdDate = this.cs.todaysDate();

    return this.ws.inputName != '' && this.ws.inputDescription != '';
  }

  createChannel() {
    if (!this.ws.dialogGeneralData) {
      debugger
      this.cs.sendDocToDB(this.channel);
      this.closeWindows();
      // this.cs.writeUserData(this.channel, '1234')
      this.channel = {
        customId: '',
        name: '',
        description: '',
        members: [],
        createdDate: '',
      };
    } else{
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
    this.channel = {
      customId: '',
      name: '',
      description: '',
      members: [],
      createdDate: '',
    };
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
