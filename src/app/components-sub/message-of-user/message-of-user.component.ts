import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-message-of-user',
  templateUrl: './message-of-user.component.html',
  styleUrls: ['./message-of-user.component.scss']
})
export class MessageOfUserComponent {
  @Input() messageData: Message = new Message();
  nameOfSender: string = '';
  allUsers!: User[];

  constructor(private us: UserService) {
    this.getUsers();
  }

  getUsers(): User[] {
    return this.us.myUsers;
  }

  findNameOfSender() {
    const nameOfSender = this.getUsers().filter((user: User) => {
      user.customId === this.messageData.userCustomId
    }
    );
    return nameOfSender[0];
  }

}
