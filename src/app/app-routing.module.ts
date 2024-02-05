import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component.js';
import { ProjectComponent } from './project/project.component.js';
import { MyPageComponent } from './my-page/my-page.component.js';
import { TicketComponent } from './ticket/ticket.component.js';
import { DevotedTimeFormComponent } from './devoted-time-form/devoted-time-form.component.js';

const routes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'my-page', component: MyPageComponent },
  { path: 'tickets/:id', component: TicketComponent },
  { path: 'tickets/:ticketId/devoted-time', component: DevotedTimeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
