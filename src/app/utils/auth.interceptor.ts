import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ErrorHandler, inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const errorHandler = inject(ErrorHandler)
  const platformId = inject(PLATFORM_ID) // necesario para evitar el error "localStorage is not defined"
  
  const token = isPlatformBrowser(platformId) ? localStorage.getItem('token') : null;

  if(token) {
    const clonedReq = req.clone( { setHeaders: { Authorization: `${token}` } })
    
    return next(clonedReq)
  }
  
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          errorHandler.handleError(error)
          router.navigate(['/login'])
        }
        return throwError(() => error)
      })
    )
};
