import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent /* implements OnChanges, OnInit*/ {
  loginDisplayIsOpen: boolean = true;
  currentRoute: string = '';

  constructor(private service: UserService, private route: ActivatedRoute) {}

  /*
  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      this.currentRoute = urlSegments.join('/');
      console.log('Aktuelle Route:', this.currentRoute);
    });
  }

  ngOnChanges() {
    this.route.url.subscribe((urlSegments) => {
      this.currentRoute = urlSegments.join('/');
      console.log('Aktuelle Route:', this.currentRoute);
    });
  }
  */

  // *TODO: change values with real login info
  createdUser: User = {
    custId: '',
    firstName: 'neu',
    lastName: 'jaaa',
    email: 'test@gmail.com',
    password: '12345',
  };

  sendDoc() {
    // push user to createdUser:{}
    this.service.sendDocToDB(this.createdUser); // send user object to DB
  }
}
