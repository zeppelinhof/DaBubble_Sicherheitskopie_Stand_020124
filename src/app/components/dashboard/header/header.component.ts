import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public us: UserService, public auth: AuthenticationService) {
    
  }

  reloadPage() {
    window.location.reload();
  }
}
