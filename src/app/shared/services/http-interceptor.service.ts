import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError
} from 'rxjs';

import { AlertService } from './alert.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ALERT_TYPE } from 'src/app/shared/models/alert';
import { APIToken } from 'src/app/_common/constant';
import { TokenHelper } from 'src/app/_common/tokenHelper';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const router = inject(Router);
  const auth = inject(AuthService);

  const token = TokenHelper.getAccessToken();

  // ✅ Attach access token
  if (token && !req.url.includes('/refreshToken')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // 🔑 401 → Refresh token logic
      if (error.status === 401) {

        // 🔹 FIRST request → call refresh API
        if (!isRefreshing) {
          isRefreshing = true;
          refreshSubject.next(null);

          return auth.refreshToken().pipe(
            switchMap((res: any) => {
              isRefreshing = false;

              // ✅ save BOTH tokens
              TokenHelper.setToken(res.data);

              // 🔔 notify waiting requests
              refreshSubject.next(res.data.token);

              // 🔁 retry original request
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.data.token}`,
                  },
                })
              );
            }),
            catchError(err => {
              isRefreshing = false;

              alertService.alert(
                'Your session expired, please login again!',
                ALERT_TYPE.ERROR
              );

              auth.logout();
              router.navigate(['/logon']);

              return throwError(() => err);
            })
          );
        }

        // 🔹 OTHER requests → wait for refreshed token
        return refreshSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token =>
            next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token!}`,
                },
              })
            )
          )
        );
      }

      // ❌ 403 Forbidden
      if (error.status === 403) {
        alertService.alert('You are not authorized.', ALERT_TYPE.ERROR);
        router.navigate(['/welcome']);
      }

      // ❌ Other errors
      if (error.status !== 401) {
        alertService.alert(
          'Error Details: ' + error.message,
          ALERT_TYPE.ERROR
        );
      }

      return throwError(() => error);
    })
  );
};
