import { HeaderComponent } from './components/dashboard/header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideLeftComponent } from './components/dashboard/side-left/side-left.component';
import { SideRightComponent } from './components/dashboard/side-right/side-right.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChannelComponent } from './components-sub/channel/channel.component';
import { MessageComponent } from './components-sub/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { DisplayLoginComponent } from './components/login/display-login/display-login.component';
import { DisplayCreateAccountComponent } from './components/login/display-create-account/display-create-account.component';
import { DisplayChooseAvatarComponent } from './components/login/display-choose-avatar/display-choose-avatar.component';
import { DisplayResetPwEnterEmailComponent } from './components/login/display-reset-pw-enter-email/display-reset-pw-enter-email.component';
import { DisplayResetPwEnterPwComponent } from './components/login/display-reset-pw-enter-pw/display-reset-pw-enter-pw.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { InputFieldComponent } from './components-sub/input-field/input-field.component';
import { CreateChannelComponent } from './components-sub/create-channel/create-channel.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideLeftComponent,
    SideRightComponent,
    HeaderComponent,
    DashboardComponent,
    CreateChannelComponent,
    ChannelComponent,
    MessageComponent,
    LoginComponent,
    DisplayLoginComponent,
    DisplayCreateAccountComponent,
    DisplayChooseAvatarComponent,
    DisplayResetPwEnterEmailComponent,
    DisplayResetPwEnterPwComponent,
    PrivacyPolicyComponent,
    InputFieldComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'dabubble-d4948',
        appId: '1:567130022113:web:caa3fc9e6b5e87cff357a0',
        storageBucket: 'dabubble-d4948.appspot.com',
        apiKey: 'AIzaSyCgNO6pPE0zcljEZxH6OacoaO2DywdeFxs',
        authDomain: 'dabubble-d4948.firebaseapp.com',
        messagingSenderId: '567130022113',
      })
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
