import { Router } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public router: Router) {}

  /*

  sendDoc() {
    // push user to createdUser:{}
    this.service.sendDocToDB(this.createdUser); // send user object to DB
  }

   */
}
