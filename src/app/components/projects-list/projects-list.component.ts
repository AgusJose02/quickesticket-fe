import { Component } from '@angular/core';

import { Project } from '../../entities/project.js';
import { ProjectService } from '../../services/project.service.js';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent {
  projects: Project[] = [];

  createProject = false;

  constructor(private projectService: ProjectService) { }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
  }
}
