import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './utils/auth.guard.js';
import { adminGuard } from './utils/admin.guard.js';
import { ProjectsListComponent } from './components/projects-list/projects-list.component.js';
import { ProjectComponent } from './components/project/project.component.js';
import { MyPageComponent } from './components/my-page/my-page.component.js';
import { TicketComponent } from './components/ticket/ticket.component.js';
import { DevotedTimeFormComponent } from './components/devoted-time-form/devoted-time-form.component.js';
import { DevotedTimeListComponent } from './components/devoted-time-list/devoted-time-list.component.js';
import { HomeComponent } from './components/home/home.component.js';
import { LoginComponent } from './components/login/login.component.js';
import { ManagementComponent } from './components/management/management.component.js';
import { UsersListComponent } from './components/users-list/users-list.component.js';
import { UserFormComponent } from './components/user-form/user-form.component.js';
import { InvoicingComponent } from './components/invoicing/invoicing.component.js';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'my-page', component: MyPageComponent, canActivate: [authGuard] },
  { path: 'projects/:id', component: ProjectComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProjectsListComponent, canActivate: [authGuard] },
  { path: 'tickets/:id', component: TicketComponent, canActivate: [authGuard] },
  { path: 'tickets/:ticketId/devoted-time/new', component: DevotedTimeFormComponent, canActivate: [authGuard] },
  { path: 'tickets/:ticketId/devoted-time', component: DevotedTimeListComponent, canActivate: [authGuard] },
  { path: 'tickets/:ticketId/devoted-time/update/:id', component: DevotedTimeFormComponent, canActivate: [authGuard] },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [
      authGuard,
      adminGuard
    ],
    children: [
      { path: 'users', component: UsersListComponent },
      { path: 'new-user', component: UserFormComponent },
      { path: 'invoicing', component: InvoicingComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
