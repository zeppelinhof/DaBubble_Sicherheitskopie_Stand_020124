import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > 768;
  constructor(private location: Location) {}

  backToPreviousRoute(): void {
    this.location.back();
  }
}
