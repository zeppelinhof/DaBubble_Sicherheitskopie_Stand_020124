import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})


export class CreateChannelComponent {

  constructor(public ws: WorkspaceService) { }
  
  allFieldsFilled(): Boolean {
    return this.ws.inputName != '' && this.ws.inputDescription != '';
  }

  btnClicked() {
    this.ws.dialogGeneralData = false;
  }

  changeRadioButton() {
    return this.ws.radioButtonFirst = this.ws.radioButtonFirst ? false : true;
  }

}