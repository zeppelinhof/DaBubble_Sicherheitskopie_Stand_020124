import { UserSettingsService } from './../../shared/services/user-settings.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { UserService } from './../../shared/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-user-data',
  templateUrl: './settings-user-data.component.html',
  styleUrls: ['./settings-user-data.component.scss'],
})
export class SettingsUserDataComponent {
  closeIsHovered: boolean = false;

  constructor(
    public us: UserService,
    public auth: AuthenticationService,
    public settingsService: UserSettingsService
  ) {}
}
