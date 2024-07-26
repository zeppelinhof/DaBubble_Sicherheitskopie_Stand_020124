import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone: true
})
export class PrivacyPolicyComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > 768;

  constructor(public location: Location) {}
}
