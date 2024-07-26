import { provideAuth, getAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ApplicationConfig, importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { SearchInputService } from './shared/services/search-input.service';

export const appConfig : ApplicationConfig = {
    providers: [
        provideRouter(routes),
    ]
}