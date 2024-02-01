import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  routerIsVisible: boolean = true;
  sideRightVisible: boolean = true;
  sideLeftVisible: boolean = true;
  constructor() { 
    
  }

  closeRouter() {
    if (window.innerWidth <= 1458) {
      this.routerIsVisible = false;
    }
  }
  onlyWorksSpace() {
    if (window.innerWidth < 960) {
      this.sideLeftVisible = true;
      this.routerIsVisible = false;
      this.sideRightVisible = false;
    } else {
      this.sideLeftVisible = !this.sideLeftVisible;
    }

  }
  onlyChannel() {
    if (window.innerWidth < 960) {
      this.sideLeftVisible = false;
      this.routerIsVisible = true;
      this.sideRightVisible = false;
    } else{ 
      this.routerIsVisible = true;
      this.sideRightVisible = false;
    }

  }
  onlyMessage() {
    if (window.innerWidth < 960) {
      this.sideLeftVisible = false;
      this.routerIsVisible = true;
      this.sideRightVisible = false;
    } else{ 
      this.routerIsVisible = true;
      this.sideRightVisible = false;
    }

  }

  onlyThread() {
    if (window.innerWidth < 1200) {
      this.sideLeftVisible = false;
      this.routerIsVisible = false;
      this.sideRightVisible = true;
      // console.log("threadopen");
    } else {
      this.sideRightVisible = true;
    }

  }
  
  mobileMode(): boolean{
    return window.innerWidth <= 610;
  }

}

  