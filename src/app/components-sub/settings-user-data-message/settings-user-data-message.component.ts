import { UserSettingsService } from './../../shared/services/user-settings.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-user-data-message',
  templateUrl: './settings-user-data-message.component.html',
  styleUrls: ['./settings-user-data-message.component.scss'],
})
export class SettingsUserDataMessageComponent {
  closeIsHovered: boolean = false;
  @Input() userName: string = '';
  @Input() userEmail: string = '';

  constructor(
    public us: UserService,
    public auth: AuthenticationService,
    public settingsService: UserSettingsService
  ) {}
}
