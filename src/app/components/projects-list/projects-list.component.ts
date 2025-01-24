import { Component } from '@angular/core';

import { Project } from '../../interfaces/project.js';
import { ProjectService } from '../../services/project.service.js';
import { ToastService } from '../../services/toast.service.js';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent {
  projects: Project[] = [];

  createProject = false;

  token = localStorage.getItem('token')
  userIsAdmin = this.authService.getPayloadField(this.token, 'isAdmin')

  constructor(
    private projectService: ProjectService,
    private toastService: ToastService,
    private authService: AuthService,
  ) { }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
    this.toastService.showMessages()
  }
}
