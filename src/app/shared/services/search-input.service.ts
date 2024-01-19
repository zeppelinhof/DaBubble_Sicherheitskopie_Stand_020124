import { Injectable } from '@angular/core';
import { WorkspaceService } from './workspace.service';
import { ChannelService } from './channel.service';
import { User } from 'src/app/models/user';
import { Channel } from 'src/app/models/channel';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {
  filteredMembers: User[] = [];
  filteredMessages: any[] = [];
  countDirectmessages: number = 0;
  countChannelmessages: number = 0;

  constructor(private ws: WorkspaceService, private cs: ChannelService, private us: UserService,) {
    this.getUsers();
    this.getChannels();
  }

  getUsers(): User[] {
    return this.us.myUsers;
  }

  getChannels() {
    return this.cs.myChannels;
  }

  allFieldsFilled(userLoggedIn: User): Boolean {
    if (this.newChannelAlreadyExists()) {   // diese Werte können vom Nutzer mehrfach für den Channel bei der Erstellung geändert werden
      this.cs.newChannel.name = this.ws.inputName;
      this.cs.newChannel.description = this.ws.inputDescription;
    } else {           // diese Werte werden nur einmal für den Channel gesetzt; userLoggedIn ist standardmäßig erster Member
      this.cs.newChannel = new Channel('', this.ws.inputName, this.ws.inputDescription, [userLoggedIn], this.cs.todaysDate(), this.us.userLoggedIn());
    }
    return this.ws.inputName != '' && this.ws.inputDescription != '';
  }

  newChannelAlreadyExists(){
    return this.cs.newChannel && this.cs.newChannel.members.length > 0;
  }

  filterMembers(existingMembers: User[]) {
    this.ws.showAddMembers = true;
    const searchTerm = this.ws.inputMember.toLowerCase();

    this.filteredMembers = this.getUsers().filter((member) => {
      const fullName = `${member.name}`.toLowerCase();
      if (this.ws.showAddMembers) {
        this.refreshMemberList(existingMembers);
      }
      return (
        fullName.includes(searchTerm) &&
        !this.memberAlreadySelected(member.email, existingMembers)
      );
    });
  }

  filterCodeLearning() {
    this.ws.globalResults = true;
    const searchTerm = this.ws.inputGlobalSearch.toLowerCase();
    this.relevantData(searchTerm);    
  }

  relevantData(searchTerm: string){
    this.filteredMessages = this.relevantDirectMessages(this.us.userLoggedIn(), searchTerm) // relevante Direkt-Nachrichten
    .concat(this.relevantChannelMessages(searchTerm))                                       // relevante Channel-Nachrichten anhängen
    .concat(this.relevantThreadMessages(searchTerm));                                       // relevante Thread-Nachrichten anhängen
  }

  relevantDirectMessages(userLoggedIn: User, searchTerm: string): any[] {
    let messagesList = [];
    if (userLoggedIn.chats) {
      for (let index = 0; index < userLoggedIn.chats.length; index++) {
        const chat = userLoggedIn.chats[index];
        if (chat.message.toLowerCase().includes(searchTerm)) {
          messagesList.push({chat: chat, userCustomId: chat.userCustomId, type: 'directMessage'})
        }
        
      }
    }    
    return messagesList;
  }  

  relevantChannelMessages(searchTerm: string) {
    let allChannels: Channel[] = this.ws.getChannels();  
    let relevantChannelMessages: any[] = [];
    for (let channel of allChannels) {
      for (let chat of channel.allMessages) {                
        if (chat.message.toLowerCase().includes(searchTerm)) {
          relevantChannelMessages.push({chat: chat, channelId: channel.customId, type: 'channelMessage'});  
        }           
      }
    }       
    return relevantChannelMessages;
  }

  relevantThreadMessages(searchTerm: string) {
    let allChannels: Channel[] = this.ws.getChannels();  
    let relevantThreadMessages: any[] = [];
    for (let channel of allChannels) {
      for (let chat of channel.allMessages) {                
        for( let thread of chat.threads){
          if (thread.answer.toLowerCase().includes(searchTerm)) {
            relevantThreadMessages.push({thread: thread, channelId: channel.customId, chat: chat, type: 'threadMessage'});  
          }    
        }
      }
    }       
    return relevantThreadMessages;
  }

  memberAlreadySelected(email: string, existingMembers: User[]): boolean {
    const members = existingMembers;
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
    this.cs.newChannel.members?.push(user);
  }

  removeMember(email: string) {    
    const members = this.cs.newChannel.members;
    if (members) {
      for (let index = 0; index < members.length; index++) {
        const member = members[index];
        if (member.email == email) {
          members.splice(index, 1);
        }
      }
    }
  }

  refreshMemberList(existingMembers: User[]) {
    setTimeout(() => {
      if (this.ws.showAddMembers) {
        this.filterMembers(existingMembers);
      }
    }, 1000);
  }

  refreshMessageList(existingMembers: User[]) {
    setTimeout(() => {
      if (this.ws.showAddMembers) {
        this.filterMembers(existingMembers);
      }
    }, 1000);
  }



  clearChannelJSON() {
    this.cs.newChannel = new Channel();
  }

  clearSearchInput() {
    this.ws.inputMember = '';
  }

  addMembersFromFirstChannel() {
    if (this.getChannels()[0].members) {
      for (let member of this.getChannels()[0].members) {        
        if (this.notUserLoggedIn(member)) { // avoid userLogged in 2 times in members
          this.cs.newChannel.members?.push(member);
        }
      }
      this.createChannel();
    }
  }

  notUserLoggedIn(member: User): boolean{
    return member.customId !== this.us.userLoggedIn().customId;
  }

  createChannel() {
    if (!this.ws.dialogGeneralData || this.ws.showAddMembersInExistingChannel) {
      this.cs.sendDocToDB(this.cs.newChannel);
      this.closeWindows();
      this.cs.newChannel = new Channel();
    } else {
      this.ws.dialogGeneralData = false;
    }
  }

  closeWindows() {
    this.ws.openCloseCreateChannel();
    this.ws.closeAddMembers();
  }

}
