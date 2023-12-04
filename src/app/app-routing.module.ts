import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { DisplayResetPwEnterPwComponent } from './components/login/display-reset-pw-enter-pw/display-reset-pw-enter-pw.component';
import { DisplayResetPwEnterEmailComponent } from './components/login/display-reset-pw-enter-email/display-reset-pw-enter-email.component';
import { DisplayChooseAvatarComponent } from './components/login/display-choose-avatar/display-choose-avatar.component';
import { DisplayCreateAccountComponent } from './components/login/display-create-account/display-create-account.component';
import { DisplayLoginComponent } from './components/login/display-login/display-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './components-sub/channel/channel.component';
import { MessageComponent } from './components-sub/message/message.component';

const routes: Routes = [
  /*login*/
  { path: '', component: DisplayLoginComponent },
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
  /*dashboard*/
  { path: 'channel', component: ChannelComponent },
  { path: 'message', component: MessageComponent },
  /*privacy policy + imprint*/
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'imprint', component: ImprintComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
