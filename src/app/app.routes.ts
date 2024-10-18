import { Routes } from '@angular/router';
import { isLoggedGuard } from './user-profile/is-logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    title: 'auth',
    path: 'auth',
    loadComponent: () =>
      import('./user-auth/user-auth.component').then(
        (c) => c.UserAuthComponent
      ),
  },
  {
    title: 'profile',
    path: 'edit-profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(
        (c) => c.UserProfileComponent
      ),
    canActivate: [isLoggedGuard],
  },
];
