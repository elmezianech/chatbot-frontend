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

  /*public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }*/

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('jwt_token'); // Assuming you store the token in local storage
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.id || null; // Assuming the user ID is stored in the 'id' field of the token
    }
    return null;
  }

  // Decode the JWT token
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  // Get user role from the token
  getUserRoleFromToken(): string[] | null {
    const decodedToken = this.decodeToken();
    console.log(decodedToken);
    return decodedToken ? decodedToken.roles : null; // Assuming roles is an array
  }

  // Check if the user has a specific role
  hasRole(role: string): boolean {
    const roles = this.getUserRoleFromToken();
    console.log(roles);
    return roles ? roles.includes(role) : false;
  }
}
