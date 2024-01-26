import { Component } from '@angular/core';
import { ResponsiveService } from 'src/app/shared/services/responsive.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';


@Component({
  selector: 'app-workspacebutton',
  templateUrl: './workspacebutton.component.html',
  styleUrls: ['./workspacebutton.component.scss']
})
export class WorkspacebuttonComponent {
  hovered: boolean = false;
  constructor(public respService: ResponsiveService, public ws: WorkspaceService) {

  }
}
