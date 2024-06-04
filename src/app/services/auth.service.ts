import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'jwt_token';

  private apiUrl = 'http://localhost:3000/api/auth'; // Replace with your actual API URL

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
}
