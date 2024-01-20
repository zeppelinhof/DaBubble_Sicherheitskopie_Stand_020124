import { Component, HostListener } from '@angular/core';
import { ResponsiveService } from 'src/app/responsive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent {
  @HostListener('window:resize')
  onResize() {
    this.checkSize();
  }
  sideRightVisible: boolean = true;
  constructor(public repService: ResponsiveService) { }

  checkSize(){
    if (window.innerWidth <= 1335){
      this.repService.sideRightVisible = false;
      console.log(this.repService.sideRightVisible);
      
    }
    
  }
}
