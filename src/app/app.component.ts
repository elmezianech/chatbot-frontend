import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule, HttpClientModule, AuthComponent]
})
export class AppComponent{
  title = 'chatbot-frontend';

  chat: boolean = false;

  constructor(private router: Router){

  }

  onChat(): boolean{
    return this.router.url === '/chat';
  }

}
