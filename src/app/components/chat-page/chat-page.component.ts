import { Component } from '@angular/core';
import { ChatHistoryComponent } from "../chat-history/chat-history.component";
import { ChatWindowComponent } from "../chat-window/chat-window.component";

@Component({
    selector: 'app-chat-page',
    standalone: true,
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.css',
    imports: [ChatHistoryComponent, ChatWindowComponent]
})
export class ChatPageComponent {

}
