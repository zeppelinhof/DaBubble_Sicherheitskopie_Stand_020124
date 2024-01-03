import { Component, ElementRef } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { Thread } from 'src/app/models/thread';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-input-field-thread',
  templateUrl: './input-field-thread.component.html',
  styleUrls: ['./input-field-thread.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class InputFieldThreadComponent {
  showEmojis: boolean = false;
  input: string = '';
  showUserList: boolean = false;
  allMembers: any = [];
  clickedChannel!: Channel;
  constructor(public service: InputService, public cs: ChannelService, private _eref: ElementRef) {}


  ngOnInit(): void {
    this.getCurrentChannel();
  }
  
  

  // fills allMembers array with all users in the current channel
  getCurrentChannel() {
    this.cs.clickedChannel.subscribe((ch: Channel) => {
      this.clickedChannel = ch;
      this.allMembers = [];
      this.allMembers.push(this.clickedChannel.members);
      console.log(this.allMembers);
      
    });
  }
  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
  }

  collectMemberFromList(item: any) {
    this.input += '@' + item;
    this.closeShowUserList();
  

  }
  closeShowUserList() {
    this.showUserList = false;
  }
  toggleBtn(target: string) {
    this.showEmojis = target === 'emojis' ? !this.showEmojis : false;
    this.showUserList = target === 'userList' ? !this.showUserList : false;
  }

  onClick(event: { target: any }) {
    if (!this._eref.nativeElement.contains(event.target)) this.closeAllDivs();
  }

  closeAllDivs() {
    this.showEmojis = false;
    this.showUserList = false;
  }
}
