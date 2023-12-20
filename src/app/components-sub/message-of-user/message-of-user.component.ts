import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-message-of-user',
  templateUrl: './message-of-user.component.html',
  styleUrls: ['./message-of-user.component.scss']
})
export class MessageOfUserComponent {
  @Input() messageData: Message = new Message();
  @Input() data: Message = new Message();
  unsubAllUsers: any;
  @Input() messageType: string = 'channel';
  showReactionChoice: boolean = false;

  constructor(public us: UserService) { }

  ngOnInit(): void {
    this.unsubAllUsers = this.us.subAllUsersListFindUserName();
  }


  reactionChoice() {
    this.showReactionChoice = !this.showReactionChoice;
  }

}