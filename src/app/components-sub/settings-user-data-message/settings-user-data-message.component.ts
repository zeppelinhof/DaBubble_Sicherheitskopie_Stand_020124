import { UserSettingsService } from './../../shared/services/user-settings.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-user-data-message',
  templateUrl: './settings-user-data-message.component.html',
  styleUrls: ['./settings-user-data-message.component.scss'],
  standalone: true
})
export class SettingsUserDataMessageComponent {
  closeIsHovered: boolean = false;
  isDesktop = window.innerWidth > 768;
  @Input() userName: string = '';
  @Input() userEmail: string = '';
  @Input() userId: string = '';

  constructor(
    public us: UserService,
    public auth: AuthenticationService,
    public settingsService: UserSettingsService
  ) {}
}
