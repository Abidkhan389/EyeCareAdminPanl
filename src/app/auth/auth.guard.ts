import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    debugger
    const currentUser = this.authService.getCurrentUser();
    const allowedRoles: string[] = route.data['allowedRoles'] || [];
    const userRoles = currentUser.roles;

    // Allow access if the user has any of the allowed roles
    const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasAccess) {
      // Redirect unauthorized users to the authentication page
      this.router.navigate(['/authentication/login']);


      return false;
    }

    return true;
  }
}
