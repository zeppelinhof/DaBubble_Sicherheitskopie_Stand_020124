import { DisplayLoginComponent } from './components/login/display-login/display-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './components-sub/channel/channel.component';
import { MessageComponent } from './components-sub/message/message.component';

const routes: Routes = [
  { path: 'channel', component: ChannelComponent },
  { path: '', component: DisplayLoginComponent },
  { path: 'message', component: MessageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
