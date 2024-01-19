import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { SearchInputService } from 'src/app/shared/services/search-input.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss'],
})
export class CreateChannelComponent {
  showLengthInfo: boolean = false;
  maxNameLength: number = 20;

  constructor(
    public ws: WorkspaceService,
    public cs: ChannelService,
    public sis: SearchInputService,
    public us: UserService
  ) { }

  changeRadioButton() {
    return (this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true);
  }

  onInput() {
    this.ws.inputName = this.ws.inputName.slice(0, this.maxNameLength); // Begrenzt auf 20 Zeichen
    this.sis.allFieldsFilled(this.us.userLoggedIn());
    this.showLengthInfo = this.ws.inputName.length === this.maxNameLength;

    setTimeout(()=>{
      this.showLengthInfo = false;
    }, 10000);
  }
}
