import { Component } from '@angular/core';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss']
})
export class InputFieldChannelComponent {
  
  constructor(public service: InputService){}
}
