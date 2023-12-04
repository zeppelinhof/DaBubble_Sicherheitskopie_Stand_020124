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
  copiedList!: [{'nr': number, 'fn': string, 'ln': string, 'show': boolean}];
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
    }
    this.ws.dialogGeneralData = false;
    this.copyUserlist();
  }

  changeRadioButton() {
    return this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true;
  }

  filterMembers() {
    this.ws.showAddMembers = true;
    const searchTerm = this.ws.inputMember.toLowerCase();

    this.filteredMembers = this.myUsers.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
  }

  copyUserlist(){
    for (let index = 0; index < this.myUsers.length; index++) {
      const ele = this.myUsers[index];
      this.copiedList.push({'nr': index, 'fn': ele.firstName, 'ln': ele.lastName, 'show': true})
      
    }
  }

  addMember(user: User) {
    this.channel.members?.push(user);
  }

}