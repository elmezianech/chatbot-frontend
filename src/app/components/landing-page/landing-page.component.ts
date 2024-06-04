import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(private router: Router, private chatService: ChatService) {}

  onStartChat(event: Event): void {
    event.preventDefault(); // Prevent the default anchor behavior

    // Get the selected model type
    const selectedModel = (document.querySelector('input[name="modelType"]:checked') as HTMLInputElement)?.value;

    if (selectedModel) {
      console.log('Selected Model Type:', selectedModel);
      // Save the selected model type
      this.chatService.setSelectedModelType(selectedModel);
      // Navigate to the chat page
      this.router.navigateByUrl('/chat');
    } else {
      console.error('No model type selected');
    }
  }
}
