import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

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
}
