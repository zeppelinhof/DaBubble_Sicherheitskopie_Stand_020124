import { Component, Input } from '@angular/core';
import { Firestore, collection, doc, getDoc, onSnapshot, query, where } from '@angular/fire/firestore';
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
  allUsers: User[] = [];
  unsubAllUsers: any;

  constructor(public us: UserService, private firestore: Firestore) { }

  ngAfterViewInit() {
    this.unsubAllUsers = this.subAllUsersList();
  }

  subAllUsersList() {
    const q = collection(this.firestore, 'allUsers');
    return onSnapshot(q, (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        this.allUsers.push(this.us.setUserObject(element.data(), element.id));
      });
    });
  }

  getUserName() {
    let user = this.allUsers.find(user => user.id === this.messageData.userCustomId);
    return user ? user.name : 'Unknown';
  }
}
