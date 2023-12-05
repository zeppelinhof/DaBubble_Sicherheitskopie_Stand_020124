import { Component } from '@angular/core';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-input-field-message',
  templateUrl: './input-field-message.component.html',
  styleUrls: ['./input-field-message.component.scss']
})
export class InputFieldMessageComponent {
  constructor(public service: InputService){}
}
