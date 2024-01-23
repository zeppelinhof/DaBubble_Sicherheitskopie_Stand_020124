import { Component } from '@angular/core';
import { ResponsiveService } from 'src/app/responsive.service';

@Component({
  selector: 'app-workspacebutton',
  templateUrl: './workspacebutton.component.html',
  styleUrls: ['./workspacebutton.component.scss']
})
export class WorkspacebuttonComponent {

  constructor(public respService: ResponsiveService){

  }
}
