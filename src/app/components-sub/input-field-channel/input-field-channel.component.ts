import { Component, ElementRef } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { Channel } from 'src/app/models/channel';
import { Message } from 'src/app/models/message';
import { MessageTime } from 'src/app/models/message-time';

import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class InputFieldChannelComponent {
  showEmojis: boolean = false;
  showUserList: boolean = false;
  allMembers: any = [];
  clickedChannel!: Channel;
  allMessages: any = [];
  input: any = '';
  isInputSelected: boolean = false;
  selectedFile: File | null = null;
  imageUrls: string[] = [];
  url: any;

  constructor(
    public service: InputService,
    public cs: ChannelService,
    private us: UserService,
    private _eref: ElementRef,
    public storService: StorageService
  ) {

  }


  uploadToStorage(): string | null {
    if (this.selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, this.selectedFile.name);
      uploadBytes(storageRef, this.selectedFile);
      this.clearSelectedFile();
      this.btnNotVisible();

      
      return this.storService.getFileUrl();


    } else {
      return null;
    }

  }





  clearSelectedFile() {
    this.selectedFile = null;
  }

  ngOnInit(): void {
    this.getCurrentChannel();
  }

  // fills allMembers array with all users in the current channel
  getCurrentChannel() {
    this.cs.clickedChannel.subscribe((ch: Channel) => {
      this.clickedChannel = ch;
      this.allMembers = [];
      this.allMembers.push(this.clickedChannel.members);
    });
  }

  // adds a new member from current channel to the current input field
  collectMemberFromList(item: any) {
    this.input += '@' + item;
    this.closeShowUserList();
  }

  closeShowUserList() {
    this.showUserList = false;
  }

  clearInput() {
    this.input = '';
  }

  sendMessage(): void {
    if (this.input !== '') {
      let newMessage: Message = {
        userCustomId: this.us.userLoggedIn().customId,
        messageId: Date.now(),
        message: this.input,
        createdTime: this.cs.getCleanMessageTimeJson(new MessageTime(new Date().getDate(), this.cs.todaysDate(), this.cs.getTime())),
        emojis: [''],
        threads: [],
        // uploads the seleted file before sending message, then returns the file-url inside here <- 
        file: this.uploadToStorage(),
      };
      console.log(newMessage);
      
      this.cs.sendMessageToDB(newMessage, this.clickedChannel.customId);
      this.clearInput();





    }
    this.addMemberToChannel(this.cs.clickedChannel.value);
  }

  getFileName(): string | null {
    if (this.selectedFile) {
      return this.selectedFile.name;
    }
    return null;
  }



  addMemberToChannel(clickedChannel: Channel) {
    this.cs.updateChannel(
      { members: this.getAllMembersOfChannel(clickedChannel) },
      clickedChannel
    );
  }

  getAllMembersOfChannel(forChannel: Channel) {
    let allMembers = [];
    let alreadyMember = false;
    for (let index = 0; index < forChannel.members!.length; index++) {
      const member = forChannel.members![index];
      allMembers.push(member);
      if (member.customId === this.us.userLoggedIn().customId) {
        alreadyMember = true;
      }
    }
    // logged User nur als Member im Channel eintragen, wenn er noch nicht Member ist
    if (!alreadyMember) {
      allMembers.push(this.us.getCleanUserJson(this.us.userLoggedIn()));
    }

    return allMembers;
  }

  addEmoji($event: any) {
    this.input += $event.emoji.native;
    this.showEmojis = !this.showEmojis;
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

  fileExplorer(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFile = selectedFile;
      this.btnVisible();
    }
  }

  btnVisible(): void {
    this.service.isWritingChannel = true;
  }
  btnNotVisible(): void {
    this.service.isWritingChannel = false;
  }




}
