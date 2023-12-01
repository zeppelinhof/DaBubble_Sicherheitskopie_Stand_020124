import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  showSideLeft: boolean = true;
  showCreateChannel: boolean = false

  constructor() { }

  closeSideLeft(){
    this.showSideLeft = this.showSideLeft ? false : true;
  }

  openCreateChannel(){
    this.showCreateChannel = this.showCreateChannel ? false : true;
  }
}
