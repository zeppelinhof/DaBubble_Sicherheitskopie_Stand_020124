import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > 768;

  constructor(public location: Location) {}
}
