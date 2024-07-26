import { AuthenticationService } from './../../shared/services/authentication.service';
import { UserSettingsService } from './../../shared/services/user-settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-user-menu',
  templateUrl: './settings-user-menu.component.html',
  styleUrls: ['./settings-user-menu.component.scss'],
  standalone: true
})
export class SettingsUserMenuComponent {
  profileIsHovered: boolean = false;
  logoutIsHovered: boolean = false;

  constructor(
    public settingsService: UserSettingsService,
    public auth: AuthenticationService
  ) {}

  openProfile() {
    this.settingsService.menuIsOpen = false;
    this.settingsService.profilIsOpen = true;
  }

  logout() {
    this.settingsService.closeMenu();
    this.auth.logout();
  }
}
