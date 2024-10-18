import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../shared/services/user-info.service';

export const isLoggedGuard: CanActivateFn = () => {
  const userInfoService = inject(UserInfoService);
  const router = inject(Router);
  if (!userInfoService.isLogged()) {
    router.navigate(['/auth']);
  }
  return userInfoService.isLogged();
};
