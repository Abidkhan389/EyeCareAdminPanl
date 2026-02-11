import { AlertService } from './../../shared/services/alert.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { TokenHelper } from 'src/app/_common/tokenHelper';
import { ApiService } from 'src/app/_common/_services/api.service';
import { APIPaths, APIToken } from 'src/app/_common/constant';
//o Auth imports
import { OAuthService } from 'angular-oauth2-oidc';
import { googleAuthConfig } from '../configration/googleAuthConfig';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private readonly loginUrl = '/login?useCookies=false&useSessionCookies=false';
  private readonly RegisterUrl =
    '/register?useCookies=false&useSessionCookies=false';
    private apiUrl = 'api/Account';

  constructor(
   private http: HttpClient,
    private router: Router,
    private oAuth: OAuthService,
    private alertService: AlertService
  ) {
    super(http);
    this.oAuth.configure(googleAuthConfig);
  }

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
    localStorage.removeItem(APIToken.accessTokenKey);
    localStorage.removeItem(APIToken.refreshTokenKey);
    localStorage.removeItem('roles');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('profilePicture');
    localStorage.removeItem('email');
    TokenHelper.removeAccessToken();
     // This method redirects the user to Google's End Session Endpoint,
    // which gives them a chance to log out of Google completely.
    this.oAuth.logoutUrl = 'https://accounts.google.com/logout'; // <-- Ensure this is set
    this.oAuth.logOut(true); 
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
    
    localStorage.setItem('firstName', response.firstName ?? '');
    localStorage.setItem('lastName', response.lastName ?? '');
    localStorage.setItem('id', response.id ?? '');
    localStorage.setItem('profilePicture', response.profilePicture ?? '');
    localStorage.setItem('roles', response.roles.toString());
    localStorage.setItem('email', response.email ?? '');
    localStorage.setItem('FullName', response.firstName ?? '' + response.lastName);
  }
  public static filterRoutes(routes: Routes): Routes {
    const userRoles = localStorage.getItem('roles')?.split(',') ?? [];
    return routes;
  }

   refreshToken() {
  const model = {
    refreshToken: localStorage.getItem(APIToken.refreshTokenKey)
  };

    let onSuccess = (value: any) => {let data = value; return data; };

    return this.service(this.post(APIPaths.refreshToken, model)).pipe(
        map(value => this.processPayload(value)),
        map(onSuccess)
      );
  }
   saveTokens(token: string, refreshToken?: string) {
    localStorage.setItem(APIToken.accessTokenKey, token);
    localStorage.setItem(APIToken.refreshTokenKey, refreshToken ?? "");
  }
  // ---------------------
  // GOOGLE LOGIN
  // ---------------------
   googleLogin() {
    this.oAuth.loadDiscoveryDocument();
    this.oAuth.initLoginFlow(); // opens Google popup/screen
  }

processGoogleLogin(): Observable<any> {
  return from(this.oAuth.loadDiscoveryDocumentAndTryLogin()).pipe(
    switchMap(() => {
      if (!this.oAuth.hasValidIdToken()) {
        return throwError(() => 'No valid Google token');
      }

      const model = {
        idToken: this.oAuth.getIdToken()
      };

      return this.service(
        this.post(APIPaths.googleLogin, model)
      );
    }),
    map(value => this.processPayload(value))
  );
}

}
