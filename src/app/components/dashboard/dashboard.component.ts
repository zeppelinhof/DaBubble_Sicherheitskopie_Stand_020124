import { Component, HostListener, NgZone } from '@angular/core';
import { ResponsiveService } from 'src/app/responsive.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private resizeTimeout: any;
  sideRightVisible: boolean = true;
  
  constructor(public repService: ResponsiveService, private zone: NgZone) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.zone.run(() => {
        this.checkSize();
      });
    },10); // Ändere die Verzögerung nach Bedarf
  }

  checkSize() {
    if (window.innerWidth < 1335) {
      this.repService.sideRightVisible = false;
      console.log(window.innerWidth);
    } else {
      this.repService.sideRightVisible = true;
    }
  }
}

