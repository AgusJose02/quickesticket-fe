import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsListComponent } from './components/projects-list/projects-list.component.js';
import { ProjectComponent } from './components/project/project.component.js';
import { MyPageComponent } from './components/my-page/my-page.component.js';
import { TicketComponent } from './components/ticket/ticket.component.js';
import { DevotedTimeFormComponent } from './components/devoted-time-form/devoted-time-form.component.js';
import { DevotedTimeListComponent } from './components/devoted-time-list/devoted-time-list.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { LoginComponent } from './components/login/login.component.js';
import { UserManagementComponent } from './components/user-management/user-management.component.js';
import { authGuard } from './utils/auth.guard.js';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectsListComponent, canActivate: [authGuard] },
  { path: 'projects/:id', component: ProjectComponent, canActivate: [authGuard] },
  { path: 'my-page', component: MyPageComponent, canActivate: [authGuard] },
  { path: 'tickets/:id', component: TicketComponent, canActivate: [authGuard] },
  { path: 'tickets/:ticketId/devoted-time/new', component: DevotedTimeFormComponent, canActivate: [authGuard] },
  { path: 'tickets/:ticketId/devoted-time', component: DevotedTimeListComponent, canActivate: [authGuard] },
  { path: 'tickets/:ticketId/devoted-time/update/:id', component: DevotedTimeFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
