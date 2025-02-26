import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceDepricated {
  private readonly loginUrl = '/login?useCookies=false&useSessionCookies=false'; // Your login endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(
    email: string,
    password: string,
    twoFactorCode: string | null,
    twoFactorRecoveryCode: string | null
  ) {
    return this.http
      .post<{ accessToken?: string; message?: string }>(this.loginUrl, {
        email,
        password,
        twoFactorCode,
        twoFactorRecoveryCode,
      })
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (response) => {
          if (response.accessToken) {
            if (response.accessToken) {
              localStorage.setItem('authToken', response.accessToken);
              this.router.navigate(['/welcome']); // Redirect to a protected route, for example
            }
          } else {
            this.displayErrorMessage(response.message || 'Login failed');
          }
        },
        error: (error) => {
          this.displayErrorMessage(error.message || 'An error occurred');
        },
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  private displayErrorMessage(message: string) {
    // You can replace this with your preferred error handling/notification service
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/logon']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
