import { Injectable } from '@angular/core';

import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const logged: boolean = this.auth.isLoggedIn();

    if (logged) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
