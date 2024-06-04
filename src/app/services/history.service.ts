import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Session } from '../models/session.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:3000/api';
  private selectedSessionSubject: BehaviorSubject<Session | null> = new BehaviorSubject<Session | null>(null);
  public selectedSession$: Observable<Session | null> = this.selectedSessionSubject.asObservable();
  public newChatSubject = new BehaviorSubject<boolean>(false); 
  newChat$ = this.newChatSubject.asObservable(); 
  private sessionListSubject: BehaviorSubject<Session[]> = new BehaviorSubject<Session[]>([]);
  public sessionList$: Observable<Session[]> = this.sessionListSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

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
    console.log('from service', sessionId, message, messageType);
    const url = `${this.apiUrl}/sessions/${sessionId}/messages`;
    const body = { content: message, type: messageType };
    return this.http.post<Session>(url, body);
  }

  // Set the selected session
  setSelectedSession(session: Session | null): void {
    this.selectedSessionSubject.next(session);
  }

  clearNewChat(): void {
    this.newChatSubject.next(false);
  }

  refreshSessionList(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.getUserSessions(userId).subscribe(
        sessions => {
          this.sessionListSubject.next(sessions);
          console.log('sessions from service: ', this.sessionListSubject);
        },
        error => {
          console.error('Error loading chat sessions:', error);
        }
      );
    } else {
      console.error('User ID not found in JWT token');
    }
  }

  notifySessionListChange(): void {
    this.refreshSessionList();
  }

  deleteSession(sessionId: string): Observable<any> {
    const url = `${this.apiUrl}/sessions/${sessionId}/delete`;
    return this.http.post<any>(url, {}); // Ensure an empty body is sent
  }
  
}