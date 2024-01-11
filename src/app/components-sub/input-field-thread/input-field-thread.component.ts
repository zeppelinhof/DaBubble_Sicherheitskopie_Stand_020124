import { Component, ElementRef } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

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
  private fileInputRef: HTMLInputElement | undefined;
  selectedFile: File | null = null;
  constructor(public service: InputService, public cs: ChannelService, private _eref: ElementRef, private ts: ThreadService, private storService: StorageService) {}


  fileExplorer(event: any): void {
    this.fileInputRef = event.target as HTMLInputElement;
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFile = selectedFile;
      this.btnVisible();
      this.storService.uploadToStorage(this.selectedFile);


    }

  }
  clearAll() {
    this.clearFileInput();
    this.clearSelectedFile();
    this.btnNotVisible();
    this.clearInput();
    this.clearUrl();
    this.service.inputFilled = false;
  }
  clearSelectedFile() {
    this.selectedFile = null;
  }
  
  clearInput() {
    this.input = '';
  }
  clearFileInput() {
    if (this.fileInputRef) {
      this.fileInputRef.value = '';
    }
  }

  clearUrl() {
    this.storService.channelCurrentUrl = "";
  }


  btnVisible(): void {
    this.service.isWritingChannel = true;
  }
  btnNotVisible(): void {
    this.service.isWritingChannel = false;
  }

  ngOnInit(): void {
    this.getCurrentChannel();
  }
  
  sendThreadMessage() {
    if (this.input !== '') {
      this.ts.addThreadAnswer(this.input);
      this.clearAll();
    }
  }

  // fills allMembers array with all users in the current channel
  getCurrentChannel() {
    this.cs.clickedChannel.subscribe((ch: Channel) => {
      this.ts.clickedChannel = ch;
      this.allMembers = [];
      this.allMembers.push(this.ts.clickedChannel.members);     
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
