import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
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
