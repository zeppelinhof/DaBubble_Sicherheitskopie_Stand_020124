import { Component } from '@angular/core';
// import { Channel } from 'src/app/interfaces/channel';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { SearchInputService } from 'src/app/shared/services/search-input.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  clickedChannelId!: string;
  clickedChannel!: Channel;
  infoVisible: boolean = false;
  editNameButton: boolean = true;
  editDescriptionButton: boolean = true;
  addMembersInExistingChannel: boolean = false;


  constructor(public ws: WorkspaceService, public cs: ChannelService, public sis: SearchInputService) { }

  ngOnInit(): void {
    this.cs.clickedChannelId
      .subscribe((chId: string) => {
        this.clickedChannelId = chId;
      });

    this.cs.clickedChannel
      .subscribe((ch: Channel) => {
        this.clickedChannel = ch;
      });
  }

  showInfo() {
    this.infoVisible = this.infoVisible ? false : true;
    this.editNameButton = true;
    this.editDescriptionButton = true;
  }

  switchAddMembersInExistingChannel() {
    this.addMembersInExistingChannel = !this.addMembersInExistingChannel;
  }

  changeNameToInput() {
    this.editNameButton = this.editNameButton ? false : true;
  }

  changeDescriptionToInput() {
    this.editDescriptionButton = !this.editDescriptionButton;
  }

}
