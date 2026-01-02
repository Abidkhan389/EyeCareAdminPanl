import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AlertService } from './alert.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ALERT_TYPE } from 'src/app/shared/models/alert';
import { APIToken } from 'src/app/_common/constant';
import { TokenHelper } from 'src/app/_common/tokenHelper';

let isRefreshing = false;

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const router = inject(Router);
  const auth = inject(AuthService);

  const token = localStorage.getItem(APIToken.accessTokenKey);

  // Add token to headers
  if (token && !req.url.includes('/refreshToken')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🔑 HANDLE 401 → REFRESH TOKEN
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;
        
        return auth.refreshToken().pipe(
          switchMap((res: any) => {
            isRefreshing = false;
            TokenHelper.setToken(res.data);
            
            // Save new tokens
            //auth.saveTokens(res.data.token, res.data.refreshToken);

            // Retry original request with new token
            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.data.token}` },
            });

            return next(clonedReq);
          }),
          catchError(() => {
            isRefreshing = false;

            // Logout user if refresh fails
            alertService.alert(
              'Your session expired, please login again!',
              ALERT_TYPE.ERROR
            );
            auth.logout();
            router.navigate(['/logon']);

            return throwError(() => error);
          })
        );
      }

      // ❌ 403 forbidden
      if (error.status === 403) {
        alertService.alert('You are not authorized.', ALERT_TYPE.ERROR);
        router.navigate(['/welcome']);
      }

      // ❌ other errors
      if (error.status !== 401) {
        alertService.alert('Error Details: ' + error.message, ALERT_TYPE.ERROR);
      }

      return throwError(() => error);
    })
  );
};
