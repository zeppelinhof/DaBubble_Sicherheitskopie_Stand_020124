import { Component } from '@angular/core';
import { InputService } from 'src/app/shared/services/input.service';

@Component({
  selector: 'app-input-field-thread',
  templateUrl: './input-field-thread.component.html',
  styleUrls: ['./input-field-thread.component.scss']
})
export class InputFieldThreadComponent {
  
  constructor(public service: InputService){}
}
