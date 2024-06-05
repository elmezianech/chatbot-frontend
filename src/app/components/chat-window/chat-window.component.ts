import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';
import { Session } from '../../models/session.model';
import { HistoryService } from '../../services/history.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [ChatService]
})
export class ChatWindowComponent implements OnInit {
  userInput: string = '';
  messages: any[] = [];
  activeSession: Session | null = null;
  isNewChat: boolean = this.activeSession?._id === '';
  isGeneratingResponse: boolean = false;

  constructor(
    private chatService: ChatService,
    private historyService: HistoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.historyService.newChatSubject.next(true);

    this.historyService.selectedSession$.subscribe(session => {
      this.activeSession = session;
      if (!this.activeSession) {
        this.createNewChatSession();
      } else {
        this.loadMessagesFromSession();
      }
    });
  }

  setModelType(modelType: string): void {
    this.chatService.setSelectedModelType(modelType);
  }

  createNewChatSession(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      const newSession: Session = {
        _id: '',
        userId: userId,
        messages: []
      };
      this.activeSession = newSession;
    }
  }

  loadMessagesFromSession(): void {
    if (this.activeSession) {
      this.messages = this.activeSession.messages.map(msg => ({
        text: msg.content,
        user: msg.type === 'user'
      }));
    }
  }

  sendMessage() {
    if (this.userInput.trim()) {
      const userMessage = this.userInput;
      this.messages.push({ text: userMessage, user: true });
      this.userInput = ''; // Clear the input field immediately

      if (this.activeSession) {
        if (this.activeSession._id === '') {
          this.saveNewSession(userMessage);
        } else {
          this.saveMessage(userMessage, 'user');
        }
      } else {
        console.error('Active session is null.');
      }
    }
  }

  private saveNewSession(userMessage: string): void {
    if (this.activeSession) {
      this.historyService.createSession(this.activeSession).subscribe(
        createdSession => {
          this.historyService.setSelectedSession(createdSession);
          this.activeSession = createdSession;
          console.log('New chat session created and saved:', createdSession);

          this.historyService.clearNewChat();
          this.activeSession._id = createdSession._id;
          this.saveMessage(userMessage, 'user');
          this.historyService.notifySessionListChange();
        },
        error => {
          console.error('Error creating chat session:', error);
        }
      );
    } else {
      console.error('Active session is null while saving new session.');
    }
  }

  private saveMessage(messageContent: string, messageType: 'user' | 'bot'): void {
    if (this.activeSession) {
      this.historyService.addMessageToSession(this.activeSession._id, messageContent, messageType).subscribe(
        updatedSession => {
          this.historyService.setSelectedSession(updatedSession);
          console.log(messageType === 'user' ? 'User message saved:' : 'Bot response saved:', updatedSession);

          if (messageType === 'user') {
            this.isGeneratingResponse = true;
            this.chatService.getResponse(messageContent).subscribe(
              response => {
                this.messages.push({ text: response, user: false });
                this.saveMessage(response, 'bot');
                this.isGeneratingResponse = false;
                this.historyService.notifySessionListChange();
              },
              error => {
                this.messages.push({ text: 'Error: Unable to get response from the server.', user: false });
                this.isGeneratingResponse = false;
              }
            );
          } else {
            this.userInput = '';
          }
        },
        error => {
          console.error('Error saving message:', error);
        }
      );
    } else {
      console.error('Active session is null while saving message.');
    }
  }
}
