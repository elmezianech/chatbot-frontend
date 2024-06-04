import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  
  canActivate(): boolean {
    if (this.authService.isSignedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}
