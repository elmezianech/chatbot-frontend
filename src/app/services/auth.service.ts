import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'jwt_token';

  private apiUrl = 'http://localhost:3000/api/auth'; 
  private userUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signUp(data: { firstName: string, lastName: string, email: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  signIn(data: { email: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}/signin`;
    return this.http.post<any>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getUsersWithSessions(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.userUrl, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.userUrl}/${userId}`, { headers });
  }

  // Store JWT token in local storage
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  
  // Retrieve JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove JWT token from local storage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if user is signed in
  isSignedIn(): boolean {
    return !!this.getToken();
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.id || null; 
    }
    return null;
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  getUserRoleFromToken(): string[] | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.roles : null;
  }

  hasRole(role: string): boolean {
    const roles = this.getUserRoleFromToken();
    return roles ? roles.includes(role) : false;
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }
}
