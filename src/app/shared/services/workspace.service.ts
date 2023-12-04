import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  showSideLeft: boolean = true;
  showCreateChannel: boolean = false;
  showAddMembers: boolean = false;
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

  openCloseCreateChannel() {
    this.showCreateChannel = this.showCreateChannel ? false : true;
    this.clearValues();
  }

  openCloseAddMembers() {
    this.showAddMembers = this.showAddMembers ? false : true;
  }

  clearValues(){
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
