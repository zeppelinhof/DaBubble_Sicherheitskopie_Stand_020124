import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
<<<<<<< HEAD
  constructor(public us: UserService, public auth: AuthenticationService) {}
=======


  constructor(public us: UserService){}

  reloadPage(){
    window.location.reload();
  }
>>>>>>> 795e090ce3ebe474e2fba9deb4c94037ae021552
}
