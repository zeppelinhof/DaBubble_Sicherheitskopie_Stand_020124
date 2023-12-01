import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})


export class CreateChannelComponent {
  showCreateChannelButton: boolean = false;
  

  inputName: string = '';
  inputDescription: string = '';

  allFieldsFilled(): Boolean {
    return this.inputName != '' && this.inputDescription != '';
  }
  
}