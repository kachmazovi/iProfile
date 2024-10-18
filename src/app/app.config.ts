import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebaseConfig } from '../assets/configs/firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
  ],
};
