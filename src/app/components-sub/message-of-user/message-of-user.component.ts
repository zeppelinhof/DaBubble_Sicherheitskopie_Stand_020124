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
  @Input() data: any = {};
  nameOfSender: string = '';

  constructor(private us: UserService) {  
  }

  ngOnInit(): void {
    // this.messageData.userCustomId
    this.nameOfSender = this.us.findNameOfSender('rjslEQbi0TCTVMuAPcw0');
  }

}
