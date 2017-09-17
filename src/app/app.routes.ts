import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);