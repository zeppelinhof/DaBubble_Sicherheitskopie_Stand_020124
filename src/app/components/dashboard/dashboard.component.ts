import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { CreateChannelComponent } from 'src/app/components-sub/create-channel/create-channel.component';
import { WorkspacebuttonComponent } from 'src/app/components-sub/workspacebutton/workspacebutton.component';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { SideRightComponent } from './side-right/side-right.component';
import { RouterOutlet } from '@angular/router';
import { SideLeftComponent } from './side-left/side-left.component';
import { HeaderComponent } from './header/header.component';
import { MobileHeaderComponent } from 'src/app/components-sub/mobile-header/mobile-header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [WorkspacebuttonComponent, CreateChannelComponent, SideRightComponent, RouterOutlet, SideLeftComponent, HeaderComponent, MobileHeaderComponent],
  standalone: true
})
export class DashboardComponent {
  private resizeTimeout: any;
  sideRightVisible: boolean = true;
  
  constructor(public repService: ResponsiveService, private zone: NgZone) {
    this.onInit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.zone.run(() => {
        this.checkSizeRightSide();
        this.checkSizeLeftSide();
        this.checkEverything();
      });
    },100); // Ändere die Verzögerung nach Bedarf
  }

  onInit(){
    this.checkFirstLoadMobile();
    console.log('dashboard  loaded');
  }

  checkEverything(){
    if(window.innerWidth  >= 610){
      this.repService.sideLeftVisible = false;
      this.repService.sideRightVisible = false;
      this.repService.routerIsVisible = true;
      // console.log("resize");
      
    }
    if(window.innerWidth  <= 610){
      this.repService.sideLeftVisible = false;
      this.repService.sideRightVisible = false;
      this.repService.routerIsVisible = true;
      // console.log("resize");
      
    }
  }

  checkFirstLoadMobile(){
    if(window.innerWidth < 960){
      this.repService.sideLeftVisible = false;
      this.repService.sideRightVisible = false;
      this.repService.routerIsVisible = true;
    }
    
  }
  checkSizeRightSide() {
    if (window.innerWidth < 1335) {
      this.repService.sideRightVisible = false;
    } else {
      this.repService.sideRightVisible = true;
    }
  }

  checkSizeLeftSide() {
    if (window.innerWidth < 960) {
      this.repService.sideLeftVisible = false;
    } else {
      this.repService.sideLeftVisible = true;
    }
  }

  responsiveView(){
    if(window.innerWidth < 960){
      this.repService.sideLeftVisible = true;
      this.repService.sideRightVisible = false;
      this.repService.routerIsVisible = false;
    }
  }
  
  
}

