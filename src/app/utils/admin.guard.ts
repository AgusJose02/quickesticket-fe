import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service.js';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  
  const token = localStorage.getItem('token')
  const userIsAdmin = authService.getPayloadField(token, 'isAdmin')

  if(!userIsAdmin) {
    router.navigate(['/login'])
  }
  
  return true;
};
