import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSessionCheckService {
  userIsLogged: boolean = true;

  constructor() {}
}
