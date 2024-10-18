import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    title: 'auth',
    path: 'auth',
    component: UserAuthComponent,
  },
  {
    title: 'profile',
    path: 'edit-profile',
    component: UserProfileComponent,
  },
];
