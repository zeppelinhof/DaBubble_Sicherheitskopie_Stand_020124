import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './sub-components/channel/channel.component';
import { MessageComponent } from './message/message.component';




const routes: Routes = [
  { path: '', component: ChannelComponent },
  { path: 'message', component: MessageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
