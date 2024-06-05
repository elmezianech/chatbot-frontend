import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DashGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const isAdmin = this.authService.hasRole('ROLE_ADMIN');

      if (isAdmin) {
        console.log('is admin!')
        return true;
      } else {
        console.log('not admin')
        this.router.navigate(['/not-authorized']);
        return false;
      }
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }


}