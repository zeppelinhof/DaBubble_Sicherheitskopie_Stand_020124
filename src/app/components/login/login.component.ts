import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
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
 
  // *TODO: change values with real login info
  createdUser2: User = new User('', 'neu', 'jaaa', 'test@gmail.com', '12345');

  createdUser: User = new User();

  sendDoc() {
    // push user to createdUser:{}
    this.service.sendDocToDB(this.createdUser); // send user object to DB
  }

   */
}
