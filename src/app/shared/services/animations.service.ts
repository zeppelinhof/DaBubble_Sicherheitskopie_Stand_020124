import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  emailWasSent: boolean = false;
  newUserSuccess: boolean = false;

  constructor() {}
}
