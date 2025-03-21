import { AlertService } from './../../shared/services/alert.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenHelper } from 'src/app/_common/tokenHelper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl = '/login?useCookies=false&useSessionCookies=false';
  private readonly RegisterUrl =
    '/register?useCookies=false&useSessionCookies=false';
    private apiUrl = 'api/Account';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}

  getCurrentUser(): { userName: string; roles: string[]; id?: string } {
    const roles = localStorage.getItem('roles')?.split(',') ?? [];
    const userName = localStorage.getItem('email') ?? '';
    const id = localStorage.getItem('id') ?? '';
    return {
      userName,
      roles,
      id,
    };
  }

  login(model:any) {
    return this.http
    .post<any>('https://localhost:7254/api/Account/Login', model)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.alertService.catchError(error)
        )
      );
  }
  registerUser(model: any): Observable<any> {
    //return this.http.post<any>(this.apiUrl, model);
    return this.http
      .post<any>('https://localhost:7254/api/Administrator/UserRegister',model)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.alertService.catchError(error)
        )
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('profilePicture');
    localStorage.removeItem('email');
    TokenHelper.removeAccessToken();

    this.router.navigate(['authentication/login']);
  }

  static RedirectUserHome(
    response: {
      token?: string;
      message?: string;
      roles: string[];
      email?: string;
      firstName?: string;
      lastName?: string;
      profilePicture?: string;
      id?: string;
    },
    router: Router
  ) {
    if (response.roles.includes('Admin') || response.roles.includes('SuperAdmin') || response.roles.includes('Doctor') || response.roles.includes('Receptionist') )
    {
      router.navigate(['']);
    }      
    if (response.roles.includes('PARENT') || response.roles.includes('STUDENT'))
      router.navigate(['/parent']);
    if (response.roles.includes('TEACHER')) router.navigate(['/learning']);
    if (response.roles.includes('DRIVER')) router.navigate(['/route']);
    if (response.roles.includes('FINANCE')) router.navigate(['/billing']);
  }

  public static SaveUserInfo(response: {
    token?: string;
    message?: string;
    roles: string[];
    email?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    id?: string;
    user?:any;
  }) {
    localStorage.setItem('authToken', response.token ?? '');
    localStorage.setItem('firstName', response.firstName ?? '');
    localStorage.setItem('lastName', response.lastName ?? '');
    localStorage.setItem('id', response.user.id ?? '');
    localStorage.setItem('profilePicture', response.profilePicture ?? '');
    localStorage.setItem('roles', response.roles.toString());
    localStorage.setItem('email', response.user.email ?? '');
    localStorage.setItem('FullName', response.firstName ?? '' + response.lastName ?? '');
  }
  public static filterRoutes(routes: Routes): Routes {
    const userRoles = localStorage.getItem('roles')?.split(',') ?? [];
    return routes;
  }
}
