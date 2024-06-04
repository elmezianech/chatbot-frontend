import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:3000/api';
  private selectedSessionSubject: BehaviorSubject<Session | null> = new BehaviorSubject<Session | null>(null);
  public selectedSession$: Observable<Session | null> = this.selectedSessionSubject.asObservable();

  // Expose the active session as an observable
  getActiveSession$(): Observable<Session | null> {
    return this.selectedSession$;
  }

  constructor(private http: HttpClient) { }

  // Retrieve chat sessions for a user
  getUserSessions(userId: string): Observable<Session[]> {
    const url = `${this.apiUrl}/users/${userId}/sessions`;
    return this.http.get<Session[]>(url);
  }

  // Create a new chat session
  createSession(session: Session): Observable<Session> {
    const url = `${this.apiUrl}/sessions`;
    return this.http.post<Session>(url, session);
  }

  addMessageToSession(sessionId: string, message: string, messageType: 'user' | 'bot'): Observable<Session> {
    console.log('from service', sessionId, message, messageType)
    const url = `${this.apiUrl}/sessions/${sessionId}/messages`;
    const body = { content: message, type: messageType };
    return this.http.post<Session>(url, body);
  }

  // Set the selected session
  setSelectedSession(session: Session | null): void {
    this.selectedSessionSubject.next(session);
  }
}
