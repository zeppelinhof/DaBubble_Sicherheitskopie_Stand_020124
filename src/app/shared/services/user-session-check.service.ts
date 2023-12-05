import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSessionCheckService {
  /*
  private _userIsLoggedKey = 'userIsLogged';
  userIsLogged: boolean = true;

  constructor(private router: Router) {}

  setUserIsLogged() {
    localStorage.setItem(this._userIsLoggedKey, 'true');
    console.log(this.userIsLogged);
    this.router.navigate(['/start']);
  }

  getUserIsLogged() {
    const storedValue = localStorage.getItem(this._userIsLoggedKey);
    this.userIsLogged = storedValue ? JSON.parse(storedValue) : false;
    this.router.navigate(['/channel']);
  }

  */
}
