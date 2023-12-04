import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})


export class CreateChannelComponent {
  myUsers: User[] = [];
  filteredMembers: User[] = [];

  constructor(private service: UserService, public ws: WorkspaceService) {
    this.myUsers = this.service.allUsers// getting allUsers from user.service.ts 
   }
  
  allFieldsFilled(): Boolean {
    return this.ws.inputName != '' && this.ws.inputDescription != '';
  }

  btnClicked() {
    this.ws.dialogGeneralData = false;
  }

  changeRadioButton() {
    return this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true;
  }

  filterMembers() {
    this.ws.showAddMembers = true;
    const searchTerm = this.ws.inputCertainMembers.toLowerCase();

    this.filteredMembers = this.myUsers.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
  }

}