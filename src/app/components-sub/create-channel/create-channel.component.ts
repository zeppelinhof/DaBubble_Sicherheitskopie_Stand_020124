import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { User } from 'src/app/interfaces/user';
import { Channel } from 'src/app/interfaces/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})


export class CreateChannelComponent {
  myUsers: User[] = [];
  filteredMembers: User[] = [];
  membersSelected: string[] = [];
  channel: Channel = { customId: '', name: '', description: '', members: [], createdDate: '' };

  constructor(private service: UserService, public ws: WorkspaceService, private cs: ChannelService) {
    this.myUsers = this.service.allUsers// getting allUsers from user.service.ts 
  }

  allFieldsFilled(): Boolean {
    this.channel.name = this.ws.inputName;
    this.channel.description = this.ws.inputDescription;
    this.channel.createdBy = { firstName: 'Frederick', lastName: 'Beck', email: '', password: '' };
    return this.ws.inputName != '' && this.ws.inputDescription != '';
  }

  btnClicked() {
    if (!this.ws.dialogGeneralData) {
      this.cs.sendDocToDB(this.channel);
      this.ws.openCloseCreateChannel();
      this.ws.openCloseAddMembers();
      this.channel = { customId: '', name: '', description: '', members: [], createdDate: '' };
    }
    this.ws.dialogGeneralData = false;
  }

  changeRadioButton() {
    return this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true;
  }

  filterMembers() {
    this.ws.showAddMembers = true;
    const searchTerm = this.ws.inputMember.toLowerCase();

    this.filteredMembers = this.myUsers.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      if (this.ws.showAddMembers) {
        this.refreshMemberList();
      }
      return fullName.includes(searchTerm) && !this.memberAlreadySelected(member.email);
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

}