import { bootstrapApplication, createApplication } from "@angular/platform-browser"
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getStorage, provideStorage } from "@angular/fire/storage";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";

const firebaseConfig = {
    projectId: 'dabubble-103e0',
    appId: '1:70509923390:web:61bdc1681f8174a4d1156f',
    storageBucket: 'dabubble-103e0.appspot.com',
    apiKey: 'AIzaSyC5RQtRRhPW7ONg3KcrZ3gPCEekvBZf_5M',
    authDomain: 'dabubble-103e0.firebaseapp.com',
    messagingSenderId: '70509923390',
}

bootstrapApplication(AppComponent, {
    providers:[
        provideHttpClient(),
        importProvidersFrom(provideFirebaseApp(()=> initializeApp(firebaseConfig))),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideFirestore(() => getFirestore())),
        importProvidersFrom(provideStorage(() => getStorage())),
        provideRouter(routes)
    ]
})
.catch(err => console.log(err));

