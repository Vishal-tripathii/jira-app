import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let checkUserLoggin: any;

  const isLoggedIn = userService.getCurrentUser();

  if(isLoggedIn) {
    return true
  }

  else {
    router.navigate(['/login-page']);
    return false;
  }

}