import { Component } from '@angular/core';

@Component({
  selector: 'app-side-right',
  templateUrl: './side-right.component.html',
  styleUrls: ['./side-right.component.scss']
})
export class SideRightComponent {
  containerIsVisible: boolean = true;
  

  constructor() { }
  
  toggleVisibility() {
    this.containerIsVisible = !this.containerIsVisible;
  }
}
