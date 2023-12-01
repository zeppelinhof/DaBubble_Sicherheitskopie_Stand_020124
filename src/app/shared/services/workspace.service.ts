import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  showSideLeft = true;

  constructor() { }

  closeSideLeft(){
    this.showSideLeft = this.showSideLeft ? false : true;
  }
}
