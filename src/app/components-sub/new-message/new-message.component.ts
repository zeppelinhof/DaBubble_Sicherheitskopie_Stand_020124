import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent {
  allUsers: User[]

  inputMember: string = '';

  showAddMember: boolean = false;

  filteredMembers: User[] = [];
  member: User = {
    firstName: '',
    lastName: '',
    custId: '',
    email: '@',
    password: ''
  };

  constructor(private us: UserService, private ws: WorkspaceService) {
    this.allUsers = this.getUsers();
  }

  getUsers(): User[] {
    return this.us.myUsers;
  }

  async filterMembers() {
    this.allUsers = await this.getUsers();
    this.showAddMember = true;
    const searchTerm = this.inputMember.slice(1).toLowerCase();
    debugger
    this.filteredMembers = this.allUsers.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      if (this.showAddMember) {
        this.refreshMemberList();
      }

      return (fullName.includes(searchTerm) &&
        !this.memberAlreadySelected(member.email)
      );

    });
  }

  memberAlreadySelected(email: string): boolean {
    const memberEmail = this.member.email;
    if (memberEmail == email) {
      return true;
    }
    return false;
  }

  refreshMemberList() {
    setTimeout(() => {
      if (this.showAddMember) {
        this.filterMembers();
      }
    }, 1000);
  }

  // saveFieldData(member: User) {
  //   this.member.custId = member.custId;
  //   this.member.firstName = member.firstName;
  //   this.member.lastName = member.lastName;
  //   this.member.email = member.email;
  //   this.member.password = member.password
  // }

  addMember(user: User) {
    this.member = user;
  }

  clearSearchInput() {
    this.inputMember = '';
  }

  openCloseAddMembers() {
    this.showAddMember = false;
  }

  removeMember(email: string) {
    const member = this.member
    if (member) {
      if (member.email == email) {
        this.member = {
          firstName: '',
          lastName: '',
          custId: '',
          email: '',
          password: ''
        }
      }
    }
  }





}
