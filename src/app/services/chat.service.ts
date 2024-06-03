import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatSessions: any[] = [];
  private currentSession: any = { name: 'Current Session', messages: [] };

  constructor(private http: HttpClient) {}

  getResponse(userInput: string): Observable<string> {
    // Replace with actual API call
    return of('This is a response from the bot.');
  }

  getChatSessions() {
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
}
