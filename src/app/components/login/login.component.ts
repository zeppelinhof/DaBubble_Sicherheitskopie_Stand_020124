import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: UserService ){}

  // *TODO: change values with real login info 
  createdUser: User = {
    firstName:"neu",
    lastName:"jaaa",
    email:"test@gmail.com",
    password:"12345"
  }


  sendDoc(){
    // push user to createdUser:{}
    this.service.sendDocToDB(this.createdUser) // send user object to DB
  }
}
