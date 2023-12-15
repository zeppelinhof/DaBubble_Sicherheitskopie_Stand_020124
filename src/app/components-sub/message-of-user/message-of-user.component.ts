import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-of-user',
  templateUrl: './message-of-user.component.html',
  styleUrls: ['./message-of-user.component.scss']
})
export class MessageOfUserComponent {
  // receives data from item 
  @Input() data: any = {};

  constructor(){
    
  }

}
