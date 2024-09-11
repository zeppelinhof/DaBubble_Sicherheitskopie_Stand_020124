import {Routes} from '@angular/router';
import {ChannelComponent} from './components-sub/channel/channel.component';
import {MessageComponent} from './components-sub/message/message.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DisplayChooseAvatarComponent} from './components/login/display-choose-avatar/display-choose-avatar.component';
import {
  DisplayCreateAccountComponent
} from './components/login/display-create-account/display-create-account.component';
import {DisplayLoginComponent} from './components/login/display-login/display-login.component';
import {
  DisplayResetPwEnterEmailComponent
} from './components/login/display-reset-pw-enter-email/display-reset-pw-enter-email.component';
import {
  DisplayResetPwEnterPwComponent
} from './components/login/display-reset-pw-enter-pw/display-reset-pw-enter-pw.component';
import {GoogleScreenComponent} from './components/login/google-screen/google-screen.component';
import {ImprintComponent} from './components/login/imprint/imprint.component';
import {LoginComponent} from './components/login/login.component';
import {PrivacyPolicyComponent} from './components/login/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  /*login*/
  {

    path: '', component: LoginComponent,
    children: [
      { path: '', redirectTo: 'display-login', pathMatch: 'full' },
      { path: 'display-login', component: DisplayLoginComponent },
      { path: 'choose-avatar', component: DisplayChooseAvatarComponent },
      { path: 'create-account', component: DisplayCreateAccountComponent },

      {
        path: 'reset-pw-enter-email',
        component: DisplayResetPwEnterEmailComponent,
      },
      {
        path: 'reset-pw-enter-pw',
        component: DisplayResetPwEnterPwComponent,
      },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'imprint', component: ImprintComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'channel', pathMatch: 'full' }, // URL leer => zur Seite mit dem Pfad 'channel' weitergeleiten
      { path: 'channel', component: ChannelComponent },
      { path: 'message', component: MessageComponent },
      // Mit PickerModule --> siehe https://ultimatecourses.com/blog/lazy-load-standalone-components-via-load-component
      { path: 'new-message', loadComponent: () => import('./components-sub/new-message/new-message.component').then(m => m.NewMessageComponent) },
    ],
  },
  {
    path: 'google-screen',
    component: GoogleScreenComponent,
  }
];

export class AppRoutes { }
