import { Component } from '@angular/core';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-input-field-message',
  templateUrl: './input-field-message.component.html',
  styleUrls: ['./input-field-message.component.scss']
})
export class InputFieldMessageComponent {
  clickedContact!: User;
  // allContacts: User[] = [];
  input: string = '';
  isInputSelected: boolean = false;

  constructor(public service: InputService, public us: UserService, private cs: ChannelService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
      // this.allContacts = [];
      // this.allContacts.push(this.clickedContact);
    });
  }

  sendDirectMessage() {

    // Nachricht bei Empfänger hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(this.clickedContact) }, this.clickedContact);
    // Nachricht bei Sender hinterlegen
    this.us.updateUser({ chats: this.getAllChatsOfUser(this.us.userLoggedIn()) }, this.us.userLoggedIn());
  }

  getAllChatsOfUser(forUser: User) {
    let allChats = [];

    for (let index = 0; index < forUser.chats!.length; index++) {
      const chat = forUser.chats![index];
      allChats.push(chat);      
    }debugger
    allChats.push(this.addNewMessage(forUser));
    
    return allChats;
  }

  addNewMessage(user: User) {
    // der eingeloggte User erhält für den Chat die Id des clicked contact
    if (user.customId === this.us.userLoggedIn().customId) {
      return this.us.getCleanMessageJson(new Message(this.clickedContact.customId, this.input, this.cs.todaysDate()));
    } 
    // der clicked contact erhält für den Chat die Id des eingeloggten Users
    else{
      return this.us.getCleanMessageJson(new Message(this.us.userLoggedIn().customId, this.input, this.cs.todaysDate()));
    }    
  }

}