import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsListComponent } from './projects-list/projects-list.component.js';
import { ProjectComponent } from './project/project.component.js';
import { ProjectFormComponent } from './project-form/project-form.component.js';

const routes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'projects/new', component: ProjectFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
