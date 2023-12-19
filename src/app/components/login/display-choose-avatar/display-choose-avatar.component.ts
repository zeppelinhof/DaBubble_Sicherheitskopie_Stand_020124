import { User } from 'src/app/models/user';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-choose-avatar',
  templateUrl: './display-choose-avatar.component.html',
  styleUrls: ['./display-choose-avatar.component.scss'],
})
export class DisplayChooseAvatarComponent {
  arrowBackIsHovered: boolean = false;
  newUser: User = new User();
  choosenAvatar: string | null = null;
  password: string = '';

  avatarImages = [
    'userFemale1.png',
    'userMale3.png',
    'userMale1.png',
    'userMale2.png',
    'userMale4.png',
    'userFemale2.png',
  ];

  constructor(private Auth: AuthenticationService) {}

  /**
   * Sets the chosen avatar image path.
   * @param imagePath - The path of the selected avatar image.
   */
  setAvatarImage(imagePath: string): void {
    this.choosenAvatar = imagePath;
  }

  /**
   *
   * Sets user data, signs up the user using AuthenticationService,
   * and deletes corresponding data from localStorage.
   */
  createNewUser(): void {
    this.setNewUserData();
    this.Auth.signUp(this.newUser, this.password);
    this.deleteLocalStorage();
  }

  /**
   * Sets new user data based on the values stored in localStorage.
   */
  setNewUserData(): void {
    this.password = localStorage.getItem('signUpPassword')!;
    this.newUser.name = localStorage.getItem('signUpName')!;
    this.newUser.email = localStorage.getItem('signUpEmail')!;
    this.newUser.img = this.choosenAvatar;
  }

  /**
   * Deletes signUp-related data from localStorage.
   */
  deleteLocalStorage(): void {
    localStorage.removeItem('signUpPassword');
    localStorage.removeItem('signUpName');
    localStorage.removeItem('signUpEmail');
  }
}
