import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  routerIsVisible: boolean = true;
  sideRightVisible: boolean = true;
  constructor() { }

  closeRouter() {
    if (window.innerWidth <= 1458) {
      this.routerIsVisible = false;
    }
  }

}
