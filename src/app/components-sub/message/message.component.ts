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
  intervalIdConstantly?: any;

  clickedContactId!: string;
  clickedContact!: User;
  isWriting: boolean = true;

  constructor(public service: InputService, public us: UserService, public cs: ChannelService, private ws: WorkspaceService) { }


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

  ngAfterViewInit(): void {
    // wenn sich der User auf Channels (nicht auf Messages) befindet, und messages neu geladen wird, soll die Global Search
    // auf den DOM-Elemente erst nach Laden aller Elemente geschehen (damit diese gefunden werden)
    debugger
    if (this.ws.messageToSearch) {
      this.ws.scrollToElementByContent(this.ws.messageToSearch.chat.message.toLowerCase());
    }
  }

  noChatsAvailable() {
    this.us.clickedContact.value.chats?.length == 0
  }

  scrollToBottom() {    
    clearInterval(this.intervalIdConstantly);
    this.scrolled = true;
    this.scroll.nativeElement.scrollTo({
      top: this.scroll.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  scrollToBottomConstantly() {    
    this.intervalIdConstantly = setInterval(() => {
      this.scroll.nativeElement.scrollTo({
        top: this.scroll.nativeElement.scrollHeight,
        behavior: 'smooth'
      });

    }, 300);
  }

  scrollToMessage(messageId: string) {
    debugger
    const element = document.getElementById(messageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  
  
  


}
