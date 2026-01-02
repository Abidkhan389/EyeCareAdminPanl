import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ALERT_TYPE } from 'src/app/shared/models/alert';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorServiceDepricated implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // No need to attach token here, functional interceptor handles it
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // Handle 403 Forbidden
        if (error.status === 403) {
          alert('You are not authorized.');
        }

        // Handle other errors (except 401, since refresh token handles it)
        if (error.status !== 401 && error.status !== 403) {
          alert('Error Details: ' + error.message);
        }

        return throwError(() => error);
      })
    );
  }
}
