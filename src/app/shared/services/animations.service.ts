import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  private emailWasSentSubject = new BehaviorSubject<boolean>(false);
  private newUserSuccessSubject = new BehaviorSubject<boolean>(false);

  emailWasSent$ = this.emailWasSentSubject.asObservable();
  newUserSuccess$ = this.newUserSuccessSubject.asObservable();

  setEmailWasSent(value: boolean) {
    this.emailWasSentSubject.next(value);
  }

  setNewUserSuccess(value: boolean) {
    this.newUserSuccessSubject.next(value);
  }

  constructor() {}
}
