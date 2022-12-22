import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    public authService: AuthService,
    private usersService: UsersService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // return this.isNotAuthorized(route);
    return this.isNotAuthorized(route);
  }

  isNotAuthorized(route: ActivatedRouteSnapshot) {
    if (this.authService.isAdminIs() === 'Admin') {
      return true;
    }
    {
      return this.router.navigate(['/store']);
    }
  }
}
