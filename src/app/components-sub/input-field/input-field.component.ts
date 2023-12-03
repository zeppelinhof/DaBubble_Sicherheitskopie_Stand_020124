import { Component } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  isWriting:boolean = false;

  onInput(event: any): void {
    this.isWriting = event.target.value.length > 0;
  }
}
