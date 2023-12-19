import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSessionCheckService {
  userIsLogged: boolean = false;
  currentUser: User = new User();

  constructor(private router: Router) {}

  chckIfUserIsLogged() {
    /*Todo: Überprüfung Anmeldestatus */
    if (this.userIsLogged) {
      this.router.navigate(['/dashboard/channel']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
