import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  user = localStorage.getItem('roles');
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['allowedRoles'] as string[]; 
    if (this.user && requiredRoles.includes(this.user)) {
      return true;
    } else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}
