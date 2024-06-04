import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';
import { HistoryService } from '../../services/history.service';
import { Session } from '../../models/session.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  providers: [ChatService]
})
export class ChatHistoryComponent implements OnInit {
  chatSessions: Session[] = [];
  hasNewChat: boolean = false;

  constructor(private historyService: HistoryService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.loadChatSessions(userId);
    } else {
      console.error('User ID not found in JWT token');
    }

    this.historyService.selectedSession$.subscribe(session => {
      if (session && !session._id) {
        this.hasNewChat = true;
      } else {
        this.hasNewChat = false;
      }
    });

    this.refreshChatSessions();

    this.historyService.newChat$.subscribe(hasNewChat => {
      this.hasNewChat = hasNewChat;
    });

    this.historyService.sessionList$.subscribe(sessions => {
      this.chatSessions = sessions;
    });
  }

  refreshChatSessions(): void {
    this.historyService.refreshSessionList();
  }

  loadChatSessions(userId: string): void {
    this.historyService.getUserSessions(userId).subscribe(
      sessions => {
        this.chatSessions = sessions;
      },
      error => {
        console.error('Error loading chat sessions:', error);
      }
    );
  }

  loadSession(session: Session): void {
    this.historyService.setSelectedSession(session);
  }

  newChat(): void {
    const userId = this.authService.getUserIdFromToken();

    if (userId) {
      const newSession: Session = {
        _id: '',
        userId: userId,
        messages: []
      };

      this.historyService.setSelectedSession(newSession);
      this.hasNewChat = true;
    } else {
      console.error('User ID is null. Unable to create chat session.');
    }

    this.refreshChatSessions();
  }
}
