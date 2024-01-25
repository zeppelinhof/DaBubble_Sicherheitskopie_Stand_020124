// Fenster schließen, wenn außerhalb geklickt wird

import { Injectable, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickOutsideService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor() {}

  public onClickOutside(element: ElementRef, callback: () => void): void {
    const subscription = fromEvent(document, 'click').subscribe((event: Event) => {
      const clickedInside = element.nativeElement.contains(event.target);
      if (!clickedInside) {
        callback();
      }
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
