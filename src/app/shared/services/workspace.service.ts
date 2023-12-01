import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  showSideLeft: boolean = true;
  showCreateChannel: boolean = false;
  dialogGeneralData: boolean = true;
  showCreateChannelButton: boolean = false;
  radioButtonFirst: boolean = true;
  inputName: string = '';
  inputDescription: string = '';
  inputCertainMembers: string = '';


  constructor() { }

  closeSideLeft() {
    this.showSideLeft = this.showSideLeft ? false : true;
  }

  openCreateChannel() {
    this.showCreateChannel = this.showCreateChannel ? false : true;

    if (!this.showCreateChannel) {
      this.showCreateChannel = false;
      this.dialogGeneralData = true;
      this.showCreateChannelButton = false;
      this.radioButtonFirst = true;
      this.inputName = '';
      this.inputDescription= '';
      this.inputCertainMembers = '';
    }
  }
}
