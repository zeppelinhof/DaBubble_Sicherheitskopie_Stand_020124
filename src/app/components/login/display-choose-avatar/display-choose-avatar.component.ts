import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-choose-avatar',
  templateUrl: './display-choose-avatar.component.html',
  styleUrls: ['./display-choose-avatar.component.scss'],
})
export class DisplayChooseAvatarComponent {
  arrowBackIsHovered: boolean = false;

  avatarImages = [
    'userFemale1.png',
    'userMale3.png',
    'userMale1.png',
    'userMale2.png',
    'userMale4.png',
    'userFemale2.png',
  ];

  constructor(private Auth: AuthenticationService) {
    console.log(this.Auth.signedUser);
  }
}
