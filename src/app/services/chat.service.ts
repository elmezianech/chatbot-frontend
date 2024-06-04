import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //private chatSessions: any[] = [];
  //private currentSession: any = { name: 'Current Session', messages: [] };
  private apiUrl = 'http://localhost:8000/api/chat'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getResponse(userInput: string): Observable<string> {
    const url = `${this.apiUrl}/query`; // Adjust this URL as per your API endpoint
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(userInput)
    return this.http.post<{ response: string }>(url, { message: userInput }, { headers }).pipe(
      map(response => response.response)
    );
  }

  /*getChatSessions() {
    return this.chatSessions;
  }

  loadSession(session: any) {
    this.currentSession = session;
  }

  saveCurrentSession() {
    if (!this.chatSessions.includes(this.currentSession)) {
      this.chatSessions.push(this.currentSession);
    }
  }

  addMessageToCurrentSession(message: string, user: boolean) {
    this.currentSession.messages.push({ text: message, user });
  }*/
}
