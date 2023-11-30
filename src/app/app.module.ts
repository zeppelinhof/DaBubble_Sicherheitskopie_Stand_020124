import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideLeftComponent } from './components/side-left/side-left.component';
import { SideRightComponent } from './components/side-right/side-right.component';
import { HeaderComponent } from './components/header/header.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { DashboardComponent } from './components-sub/dashboard/dashboard.component';
import { ChannelComponent } from './components-sub/channel/channel.component';
import { MessageComponent } from './components-sub/message/message.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SideLeftComponent,
    SideRightComponent,
    HeaderComponent,
    DashboardComponent,
    ChannelComponent,
    MessageComponent,
    LoginComponent,
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
    provideFirebaseApp(() => initializeApp({"projectId":"dabubble-d4948","appId":"1:567130022113:web:caa3fc9e6b5e87cff357a0","storageBucket":"dabubble-d4948.appspot.com","apiKey":"AIzaSyCgNO6pPE0zcljEZxH6OacoaO2DywdeFxs","authDomain":"dabubble-d4948.firebaseapp.com","messagingSenderId":"567130022113"})),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
