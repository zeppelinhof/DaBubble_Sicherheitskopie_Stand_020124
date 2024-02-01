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
  isDesktop = window.innerWidth > 768;
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

  /**
   * Checks if user provided necessary account data;
   * navigates to login if not, sets new user data otherwise.
   */
  checkDataLocalStorage() {
    if (this.userProvidedNoAccountData()) {
      this.router.navigate(['login/display-login']);
    } else {
      this.setNewUserData();
    }
  }

  /**
   * Checks if user provided necessary account data.
   * @returns {boolean} - True if account data is missing, false otherwise.
   */
  userProvidedNoAccountData() {
    return (
      !localStorage.getItem('signUpPassword') ||
      !localStorage.getItem('signUpName') ||
      !localStorage.getItem('signUpEmail')
    );
  }

  /**
   * Sets new user data from local storage.
   */
  setNewUserData() {
    this.password = localStorage.getItem('signUpPassword')!;
    this.newUser.name = localStorage.getItem('signUpName')!;
    this.newUser.email = localStorage.getItem('signUpEmail')!;
  }

  /**
   * Creates a new user, sets user image, deletes local storage,
   * shows/hides animation, and signs up the user.
   */
  createNewUser() {
    this.setNewUserImage();
    this.deleteLocalStorage();
    this.showAnimation();
    setTimeout(() => {
      this.hideAnimation();
      this.signNewUserUp();
      this.resetUploadedImage();
    }, 1200);
  }

  /**
   * Sets the new user image based on user's choice or.
   */
  setNewUserImage() {
    if (this.choosenAvatar) {
      this.newUser.img = this.choosenAvatar;
    } else {
      this.newUser.img = this.storService.channelCurrentUrl;
    }
  }

  /**
   * Deletes account-related data from local storage.
   */
  deleteLocalStorage() {
    localStorage.removeItem('signUpPassword');
    localStorage.removeItem('signUpName');
    localStorage.removeItem('signUpEmail');
  }

  /**
   * Shows the success animation and disables body scroll.
   */
  showAnimation() {
    document.body.style.overflow = 'hidden';
    this.animations.setNewUserSuccess(true);
  }

  /**
   * Hides the success animation.
   */
  hideAnimation() {
    this.animations.setNewUserSuccess(false);
  }

  /**
   * Signs up the new user.
   */
  signNewUserUp() {
    this.auth.signUp(this.newUser, this.password);
  }

  /**
   * Resets the uploaded image data.
   */
  resetUploadedImage() {
    this.storService.channelCurrentUrl = '';
    this.selectedFile = null;
  }

  /**
   * Sets the chosen avatar image and resets the uploaded image.
   * @param {string} imagePath - The path of the chosen avatar image.
   */
  setAvatarImage(imagePath: string) {
    this.choosenAvatar = imagePath;
    this.resetUploadedImage();
  }

  /**
   * Resets the chosen avatar image.
   */
  resetAvatarImage() {
    this.choosenAvatar = null;
  }

  /**
   * Uploads a new image to storage asynchronously, assigning it a unique name.
   * @returns {Promise<any>} - A promise that resolves when the upload is complete.
   */
  async uploadNewImage(): Promise<any> {
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
