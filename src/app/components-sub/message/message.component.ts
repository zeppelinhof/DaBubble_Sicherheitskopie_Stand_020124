import { UserSettingsService } from './../../shared/services/user-settings.service';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { InputService } from '../../shared/services/input.service';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { MessageOfUserComponent } from '../message-of-user/message-of-user.component';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @ViewChild('scroll') scroll!: ElementRef;
  @ViewChild(MessageOfUserComponent, { static: false })
  messageOfUser!: MessageOfUserComponent;
  scrolled: boolean = false;

  clickedContactId!: string;
  clickedContact!: User;
  isWriting: boolean = true;

  constructor(
    public service: InputService,
    public us: UserService,
    public cs: ChannelService,
    public ws: WorkspaceService,
    public settingsService: UserSettingsService,
    public repsService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.us.clickedContactId.subscribe((chId: string) => {
      this.clickedContactId = chId;
    });

    this.us.clickedContact.subscribe((user: User) => {
      this.clickedContact = user;
    });
    
  }

  ngAfterViewInit() {
    // wenn sich der User auf Channels (nicht auf Messages) befindet, und messages neu geladen wird, soll die Global Search
    // auf den DOM-Elemente erst nach Laden aller Elemente geschehen (damit diese gefunden werden)
    if (this.ws.messageToSearch) {
      this.ws.scrollToElementByContent(
        this.ws.messageToSearch.chat.message.toLowerCase(),
        this.ws.messageToSearch.type
      );
    }
  }

  noChatsAvailable() {
    this.us.clickedContact.value.chats?.length == 0;
  }
}
