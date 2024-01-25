import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {
  arrowBackIsHovered: boolean = false;

  constructor(private router: Router) {
    this.handleBackButton();
  }

  private handleBackButton() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //hier hinzufügen, was passieren soll, wenn Route geändert wurde - nichts
      }
    });
  }
}
