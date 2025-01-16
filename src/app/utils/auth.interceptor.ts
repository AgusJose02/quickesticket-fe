import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router)
  const errorHandler = inject(ErrorHandler)
  
  const token = localStorage.getItem('token')

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
}
