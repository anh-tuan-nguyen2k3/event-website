import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Bỏ qua các yêu cầu đến đường dẫn chứa /auth
  if (req.url.includes('/auth') || (req.url.includes('/events') && req.method === "GET") || (req.url.includes('/faculties') && req.method === "GET")) {
    console.log('Request URL:', req.url);
    return next(req);
  }

  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  return authService.introspect(token).pipe(
    switchMap((isValid: boolean) => {
      if (isValid) {
        console.log(isValid)
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(clonedReq);
      } else {
        return next(req);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      return next(req);
    })
  );
};
