import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { InputService } from '../../shared/services/input.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { MessageOfUserComponent } from '../message-of-user/message-of-user.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @ViewChild('scroll') scroll!: ElementRef;
  @ViewChild(MessageOfUserComponent, { static: false }) messageOfUser!: MessageOfUserComponent;
  scrolled: boolean = false;

  clickedContactId!: string;
  clickedContact!: User;
  isWriting: boolean = true;

  constructor(public service: InputService, public ws: WorkspaceService, public us: UserService, public cs: ChannelService) { }

  ngAfterViewInit(): void {
    this.checkChildLoaded();
  }

  checkChildLoaded() {
    setInterval(() => {
      if (this.messageOfUser && !this.scrolled) {
        this.scrollToBottom();
        this.scrolled = true;
      }
    }, 1000);
  }

  scrollToBottom() {
    this.scroll.nativeElement.scrollTo({
      top: this.scroll.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }


  ngOnInit(): void {
    this.us.clickedContactId
      .subscribe((chId: string) => {
        this.clickedContactId = chId;
      });

    this.us.clickedContact
      .subscribe((user: User) => {
        this.clickedContact = user;
      });
  }

  noChatsAvailable() {
    this.us.clickedContact.value.chats?.length == 0
  }

}
