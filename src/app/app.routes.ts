import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingPageComponent
    },
    {
        path: "chat",
        component: ChatPageComponent
    },
    {
        path: "auth",
        component: AuthComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    }
];
