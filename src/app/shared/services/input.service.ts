import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputService {
  isWritingChannel: boolean = false;
  isWritingThread: boolean = false;
  isWritingMessage: boolean = false;


  constructor() { }

  onInputChannel(event: any): void {
    this.isWritingChannel = event.target.value.length > 0;
    
  }
  onInputThread(event: any): void {
    this.isWritingThread = event.target.value.length > 0;
    
  }

  onInputMessage(event: any): void {
    this.isWritingMessage = event.target.value.length > 0;
    
  }
}
