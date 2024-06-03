import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css'],
  providers: [ChatService]
})
export class ChatHistoryComponent implements OnInit {
  chatSessions: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatSessions = this.chatService.getChatSessions();
  }

  loadSession(session: any) {
    this.chatService.loadSession(session);
  }
}
