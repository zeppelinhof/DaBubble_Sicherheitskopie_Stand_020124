import { provideHttpClient } from "@angular/common/http"
import { importProvidersFrom } from "@angular/core"
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { getAuth, provideAuth } from "@angular/fire/auth"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { getStorage, provideStorage } from "@angular/fire/storage"
import { bootstrapApplication } from "@angular/platform-browser"
import { AppComponent } from "src/app/app.component"

export const firebaseConfig = {
    projectId: 'dabubble-103e0',
    appId: '1:70509923390:web:61bdc1681f8174a4d1156f',
    storageBucket: 'dabubble-103e0.appspot.com',
    apiKey: 'AIzaSyC5RQtRRhPW7ONg3KcrZ3gPCEekvBZf_5M',
    authDomain: 'dabubble-103e0.firebaseapp.com',
    messagingSenderId: '70509923390',
}

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
