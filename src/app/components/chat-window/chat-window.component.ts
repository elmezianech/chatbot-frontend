import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  providers: [ChatService]
})
export class ChatWindowComponent {
  userInput: string = '';
  messages: any[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, user: true });
      this.chatService.getResponse(this.userInput).subscribe(response => {
        this.messages.push({ text: response, user: false });
      });
      this.userInput = '';
    }
  }
}
