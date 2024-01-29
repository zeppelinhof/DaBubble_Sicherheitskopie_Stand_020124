import { User } from 'src/app/models/user';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AnimationsService } from 'src/app/shared/services/animations.service';

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
  noImageSelected: string = 'assets/imgs/person.png';
  password: string = '';
  newUserSuccess = false;
  selectedFile: File | null = null;
  fileInputRef: HTMLInputElement | undefined;
  avatarImages = [
    'assets/imgs/userFemale1.png',
    'assets/imgs/userMale3.png',
    'assets/imgs/userMale1.png',
    'assets/imgs/userMale2.png',
    'assets/imgs/userMale4.png',
    'assets/imgs/userFemale2.png',
  ];
  @ViewChild('inputUpload') inputUpload: any;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    public storService: StorageService,
    public animations: AnimationsService
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
    this.resetUploadedImage();
  }

  /**
   *
   * Sets user data, signs up the user using AuthenticationService,
   * and deletes corresponding data from localStorage.
   */
  createNewUser(): void {
    if (this.choosenAvatar) {
      this.newUser.img = this.choosenAvatar;
    } else {
      this.newUser.img = this.storService.channelCurrentUrl;
    }
    this.deleteLocalStorage();
    this.animations.newUserSuccess = true;
    setTimeout(() => {
      this.auth.signUp(this.newUser, this.password);
    }, 680);
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

  /**
   * Resets the chosen avatar to null.
   */
  resetAvatarImage() {
    this.choosenAvatar = null;
  }

  /**
   * Resets the uploaded image URL in the storage service.
   */
  resetUploadedImage() {
    this.storService.channelCurrentUrl = '';
  }

  /**
   * Handles the file explorer functionality by uploading the selected file with number to storage.
   *
   */
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
      await this.storService.uploadToStorage(newFile);
      inputElement.value = '';
    }
  }
}
