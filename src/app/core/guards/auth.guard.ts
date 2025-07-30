import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
  const isLoggedIn = this.auth.isLoggedIn();
  const role = this.auth.getUserRole();

  if (!isLoggedIn) {
    this.router.navigate(['/auth/account-type']);
    return false;
  }

  const url = route.routeConfig?.path;

  if (url?.startsWith('private-dashboard') && role !== 'private') {
    this.router.navigate(['/auth/account-type']);
    return false;
  }

  if (url?.startsWith('business-dashboard') && role !== 'business') {
    this.router.navigate(['/auth/account-type']);
    return false;
  }

  return true;
}
}
