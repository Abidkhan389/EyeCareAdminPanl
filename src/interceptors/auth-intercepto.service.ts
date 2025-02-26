import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ALERT_TYPE } from 'src/app/shared/models/alert';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorServiceDepricated implements HttpInterceptor {
  constructor(private router: Router, private notification: AlertService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const loadingMessageId = this.message.loading('Loading data...', { nzDuration: 0 }).messageId;
    // Get the token from local storage or some other mechanism
    const token = localStorage.getItem('authToken');

    // If the token exists, clone the request and add the Authorization header
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Handle the request and catch any errors
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect the user to the login page if a 401 response is received
          this.router.navigate(['/logon']);
          this.notification.alert(
            'Your session timed out, please login again!',
            ALERT_TYPE.ERROR
          );
        } else if (error.status === 403) {
          this.notification.alert('You are not authorized.', ALERT_TYPE.ERROR);
          this.router.navigate(['/welcome']);
        } else {
          this.notification.alert(
            'Error Details:' + error.message,
            ALERT_TYPE.ERROR
          );
        }
        return throwError(error);
      })
    );
  }
}
