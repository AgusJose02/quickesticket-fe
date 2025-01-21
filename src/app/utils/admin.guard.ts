import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { Location } from '@angular/common';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const location = inject(Location)
  
  const token = localStorage.getItem('token')
  const userIsAdmin = authService.getPayloadField(token, 'isAdmin')

  if(!userIsAdmin) {
    location.back()
  }
  
  return true;
};
