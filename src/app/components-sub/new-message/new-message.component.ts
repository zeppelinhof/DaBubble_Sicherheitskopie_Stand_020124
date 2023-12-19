import { Component } from '@angular/core';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent {
  allUsers: User[];
  allChannels: Channel[];

  inputValue: string = '';

  showAddMember: boolean = false;
  showAddChannel: boolean = false;

  filteredMembers: User[] = [];
  filteredChannels: Channel[] = [];
  member: User = new User('','','','@','');

  channel: Channel = new Channel();
  clickedContact!: User;

  constructor(public us: UserService, private ws: WorkspaceService, private cs: ChannelService) {
    this.allUsers = this.getUsers();
    this.allChannels = this.getChannels();
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
    });
  }

  getUsers(): User[] {
    return this.us.myUsers;
  }

  getChannels(): Channel[] {
    return this.cs.myChannels;
  }

  async filterMembers() {
    this.openCloseAdd();
    const searchType = this.inputValue.slice(0, 1).toLowerCase();
    const searchTerm = this.inputValue.slice(1).toLowerCase();

    // Suche nach Email-Adresse
    if (this.isValidEmailFormat(this.inputValue.toLowerCase())) {      
      this.allUsers = await this.getUsers();
      this.showAddMember = true;      
      this.filteredMembers = this.allUsers.filter((member) => {
        const fullName = `${member.email}`.toLowerCase();
        if (this.showAddMember) {
          this.refreshMemberList();
        }
        return (fullName.includes(searchTerm) &&
          !this.alreadySelected(member.email, this.member.email)
        );

      });
    }
    // Suche nach User mit @
    else if (searchType == '@') {      
      this.allUsers = await this.getUsers();
      this.showAddMember = true;      
      this.filteredMembers = this.allUsers.filter((member) => {
        const fullName = `${member.name}`.toLowerCase();
        if (this.showAddMember) {
          this.refreshMemberList();
        }

        return (fullName.includes(searchTerm) &&
          !this.alreadySelected(member.email, this.member.email)
        );

      });
    } 
    // Suche nach Channels mit #
    else if(searchType == '#'){      
      this.allChannels = await this.getChannels();
      this.showAddChannel = true;
      this.filteredChannels = this.allChannels.filter((member) => {
        const fullName = `${member.name}`.toLowerCase();
        if (this.showAddChannel) {
          this.refreshMemberList();
        }

        return (fullName.includes(searchTerm) &&
          !this.alreadySelected(member.name, this.channel.name)
        );

      });
    }

  }

  alreadySelected(propertyList: string, propertyChosen: string): boolean {
    if (propertyChosen == propertyList) {
      return true;
    }
    return false;
  }

  refreshMemberList() {
    setTimeout(() => {
      if (this.showAddMember) {
        this.filterMembers();
      }
      if (this.showAddChannel) {
        this.filterMembers();
      }
    }, 1000);
  }

  addMember(user: User) {
    this.removeChannel(this.channel.name);
    this.member = user;
    this.us.setContactView(this.member.customId)
  }

  addChannel(channel: Channel) {
    this.removeMember(this.member.email);
    this.channel = channel;
  }

  clearSearchInput() {
    this.inputValue = '';
  }

  openCloseAdd() {
    this.showAddMember = false;
    this.showAddChannel = false;
  }

  removeMember(email: string) {
    const member = this.member
    if (member) {
      if (member.email == email) {
        this.member = new User('','','','@','');
      }
    }
  }

  removeChannel(name: string) {
    const channel = this.channel
    if (channel) {
      if (channel.name == name) {
        this.channel = new Channel();
      }
    }
  }

  isValidEmailFormat(input: string): boolean {
    const atIndex = input.indexOf('@');
    const dotIndex = input.lastIndexOf('.');

    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < input.length - 1;
}





}
