import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  isWriting: boolean = false;
  


  constructor() { }

  onInput(event: any): void {
    this.isWriting = event.target.value.length > 0;
    
  }
}
