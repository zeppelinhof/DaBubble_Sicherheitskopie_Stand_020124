import { Component } from '@angular/core';
import { InputService } from 'src/app/shared/services/input.service';
import { ChannelService } from '../../shared/services/channel.service';


@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss']
})
export class InputFieldChannelComponent {
  
  allUsers:[] = [];

  constructor(public service: InputService, public cs: ChannelService){
    this.allUsers = this.cs.myChannels;
    
  }
}
