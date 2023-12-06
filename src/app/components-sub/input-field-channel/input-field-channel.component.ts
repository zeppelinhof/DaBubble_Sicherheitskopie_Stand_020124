import { Component } from '@angular/core';
import { Channel } from 'src/app/interfaces/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { InputService } from 'src/app/shared/services/input.service';



@Component({
  selector: 'app-input-field-channel',
  templateUrl: './input-field-channel.component.html',
  styleUrls: ['./input-field-channel.component.scss']
})
export class InputFieldChannelComponent {
  clickedChannel!: Channel;
  
  constructor(public service: InputService, public cs: ChannelService){}

  ngOnInit(): void {
    this.cs.clickedChannel
      .subscribe((ch: Channel) => {
        this.clickedChannel = ch;
        console.log('Komponente Input Channel hat folgenden Channel erhalten:', ch)
      });
  }
  
}
