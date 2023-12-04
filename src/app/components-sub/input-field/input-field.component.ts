import { Component } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { InputService } from '../../shared/services/input.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  isWriting:boolean = false;
  

  constructor(public service: InputService){}

  
}
