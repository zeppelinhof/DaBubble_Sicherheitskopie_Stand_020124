import { User } from 'src/app/models/user';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-display-choose-avatar',
  templateUrl: './display-choose-avatar.component.html',
  styleUrls: ['./display-choose-avatar.component.scss'],
})
export class DisplayChooseAvatarComponent {
  arrowBackIsHovered: boolean = false;
  newUser: User = new User();
  choosenAvatar: string | null = null;
  showNoImage: boolean = false;
  fileWasUploaded: boolean = false;
  @ViewChild('inputUpload') inputUpload: any;
  noImageSelected: string = 'assets/imgs/person.png';
  password: string = '';
  newUserSuccess = false;
  selectedFile: File | null = null;
  url: any = '';
  fileInputRef: HTMLInputElement | undefined;
  avatarImages = [
    'assets/imgs/userFemale1.png',
    'assets/imgs/userMale3.png',
    'assets/imgs/userMale1.png',
    'assets/imgs/userMale2.png',
    'assets/imgs/userMale4.png',
    'assets/imgs/userFemale2.png',
  ];

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public storService: StorageService
  ) {
    this.checkDataLocalStorage();
  }

  checkDataLocalStorage() {
    if (
      !localStorage.getItem('signUpPassword') ||
      !localStorage.getItem('signUpName') ||
      !localStorage.getItem('signUpEmail')
    ) {
      this.router.navigate(['login/display-login']);
    } else {
      this.setNewUserData();
    }
  }

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
    if (this.selectedFile) {
      this.newUser.img = this.storService.getUrlFromStorage();
      this.deleteLocalStorage();
      this.newUserSuccess = true;
      setTimeout(() => {
        this.auth.signUp(this.newUser, this.password);
      }, 680);
    } else {
      this.newUser.img = this.choosenAvatar;
      this.deleteLocalStorage();
      this.newUserSuccess = true;
      setTimeout(() => {
        this.auth.signUp(this.newUser, this.password);
      }, 680);
    }
  }

  /**
   * Sets new user data based on the values stored in localStorage.
   */
  setNewUserData(): void {
    this.password = localStorage.getItem('signUpPassword')!;
    this.newUser.name = localStorage.getItem('signUpName')!;
    this.newUser.email = localStorage.getItem('signUpEmail')!;
  }

  /**
   * Deletes signUp-related data from localStorage.
   */
  deleteLocalStorage(): void {
    localStorage.removeItem('signUpPassword');
    localStorage.removeItem('signUpName');
    localStorage.removeItem('signUpEmail');
  }

  resetAvatarImage() {
    this.choosenAvatar = null;
  }

  async fileExplorer(): Promise<any> {
    const inputElement = this.inputUpload.nativeElement as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      let newFileName =
        this.selectedFile.name +
        Math.floor(Math.random() * (5000000 - 1000000 + 1)) +
        1000000;
      let newFile = new File([this.selectedFile], newFileName.toString(), {
        type: this.selectedFile.type,
      });
      console.log(newFile);
      await this.storService.uploadToStorage(newFile);

      inputElement.value = ''; // Aktualisierte Zeile
    }
  }
}
