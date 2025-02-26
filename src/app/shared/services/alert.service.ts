import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ALERT_TYPE } from '../models/alert';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public notification: MatSnackBar) {}

  alert(message: string, AlerType: ALERT_TYPE, action?: string) {
    let style = 'alert-primary';
    let duration = 3000;

    if (AlerType === ALERT_TYPE.SUCCESS) {
      style = 'alert-success';
    } else if (AlerType === ALERT_TYPE.ERROR) {
      style = 'alert-danger';
    } else if (AlerType === ALERT_TYPE.WARNING) {
      style = 'alert-warning';
    }

    const snackBarRef = this.notification.open(message, action ?? 'Close', {
      duration: duration,
      panelClass: ['alert', style],
      verticalPosition: 'top',
    });
  }

  catchError(error: HttpErrorResponse, msg?: string): Observable<never> {
    let errorMessage = {
      code: 100,
      message: 'An unknown error occurred!',
    };

    if (error.error instanceof ErrorEvent) {
      errorMessage = { code: 100, message: error.error.message };
    } else {
      errorMessage = { code: error.status, message: error.message };
    }

    return throwError(() => ({
      code: errorMessage.code,
      message: msg ?? errorMessage.message,
      timestamp: new Date().toISOString(),
      originalError: error,
    }));
  }
}
