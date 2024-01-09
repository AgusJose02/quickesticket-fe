import { Component } from '@angular/core';

import { Project } from '../project.js';
import { ProjectService } from '../project.service.js';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
  }
}
