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
  allContacts: User[] = [];
  input: string = '';
  isInputSelected: boolean = false;

  constructor(public service: InputService, public us: UserService, private cs: ChannelService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
      this.allContacts = [];
      this.allContacts.push(this.clickedContact);
    });
  }

  sendDirectMessage(userChats: Message[]) {
    if (userChats) {
      this.us.updateUser({ chats: this.getAllChatsOfUser(userChats) }, this.clickedContact);
    }

    // alle bisherigen Chats dieses Users in tempArray speichern vgl. Channel Messages
    // tempArray um {userCustomId: string; message: string; createdTime: any; emojis: any[]} ergänzen
    // für chats-Array des eingeloggten Users und des anderen Users updateUser in userService --> updateUser({tempArray}, clickedContact)
  }

  getAllChatsOfUser(userChats: Message[]) {
    let allChats = [];

    for (let index = 0; index < userChats.length; index++) {
      const chat = userChats[index];
      allChats.push(chat)
    }
    allChats.push(this.us.getCleanMessageJson(new Message(this.clickedContact.customId, this.input, this.cs.todaysDate())));
    return allChats;
  }

}