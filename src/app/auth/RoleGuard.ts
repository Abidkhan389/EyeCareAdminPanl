import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate ,CanLoad {
  constructor(public router: Router,private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['allowedRoles'] as string[];
    const currentUser = this.authService.getCurrentUser();
  
    const userRoles = currentUser?.roles || [];
  
    const hasAccess = userRoles.some((role: string) => requiredRoles.includes(role));
  
    if (hasAccess) {
      return true;
    } else {
      this.router.navigate(['/authentication/error']);
      return false;
    }
  }
  canLoad(route: Route): boolean {
    const requiredRoles = route.data?.['allowedRoles'] as string[];
    const currentUser = this.authService.getCurrentUser();
    const userRoles = currentUser?.roles || [];

    const hasAccess = userRoles.some((role: string) => requiredRoles.includes(role));

    if (!hasAccess) {
      this.router.navigate(['/authentication/error']);
    }

    return hasAccess;
  }

  
}
