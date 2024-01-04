import { Injectable } from '@angular/core';
import { Message } from 'src/app/models/message';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  clickedMessage!: Message;

  constructor() { }
}
