import { Component } from '@angular/core';
import { InputService } from '../../shared/services/input.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  isWriting:boolean = true;

  constructor(public service: InputService){

  }

  
}
