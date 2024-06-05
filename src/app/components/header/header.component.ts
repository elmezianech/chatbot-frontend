import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService){}

  onAuth(): boolean{
    return this.router.url === '/auth';
  }

  onChat(): boolean{
    return this.router.url === '/chat';
  }

  isSignedIn(): boolean{
    return this.authService.isSignedIn();
  }
  
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  signOut(): void {
    this.authService.removeToken();
    window.location.href = '/';
  }
}

