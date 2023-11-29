import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideLeftComponent } from './components/side-left/side-left.component';
import { SideRightComponent } from './components/side-right/side-right.component';
import { HeaderComponent } from './components/header/header.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { ChannelComponent } from './components-sub/channel/channel.component';
=======
import { ChannelComponent } from './sub-components/channel/channel.component';
>>>>>>> c889c01e7c73f1ad9d4028587f61024a57cec26b
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    SideLeftComponent,
    SideRightComponent,
    HeaderComponent,
    DashboardComponent,
    ChannelComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

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
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
