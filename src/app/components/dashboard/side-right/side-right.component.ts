import { Component } from '@angular/core';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-side-right',
  templateUrl: './side-right.component.html',
  styleUrls: ['./side-right.component.scss'],
})
export class SideRightComponent {
  constructor(public ws: WorkspaceService) {
    /*
    setInterval(() => {
      console.log('neu', this.ws.threadContainerIsVisible);
    }, 500);
    */
  }
}
