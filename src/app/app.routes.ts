import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuestGuardService } from './services/guest-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DashGuardService } from './services/dash-guard.service';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingPageComponent
    },
    {
        path: "chat",
        component: ChatPageComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "auth",
        component: AuthComponent,
        canActivate: [GuestGuardService]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [DashGuardService]
    },
    {
        path: "not-authorized",
        component: NotAuthorizedComponent
    }
];
