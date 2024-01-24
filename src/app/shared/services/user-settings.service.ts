import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  settingsAreOpen: boolean = false;
  menuIsOpen: boolean = false;
  profilIsOpen: boolean = false;
  editUserDataIsOpen: boolean = false;
  profilIsOpenThroughMessage: boolean = false;

  constructor() {}

  /**
   * Closes the user settings menu and related submenus.
   */
  closeMenu() {
    this.settingsAreOpen = false;
    this.menuIsOpen = false;
    this.profilIsOpen = false;
    this.editUserDataIsOpen = false;
  }
}
