import {Component, HostListener, Inject, InjectionToken} from '@angular/core';
import { Location } from '@angular/common';

export const INNERWIDTH = new InjectionToken<number>('number of inner width')

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss'],
  standalone: true
})
export class ImprintComponent {
  arrowBackIsHovered: boolean = false;
  isDesktop = window.innerWidth > this.innerWidth;

  constructor(public location: Location, @Inject(INNERWIDTH) private readonly innerWidth: number) {}
}
