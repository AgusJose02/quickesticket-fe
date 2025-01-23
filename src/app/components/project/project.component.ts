import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../interfaces/project.js';
import { ProjectService } from '../../services/project.service.js';
import { ToastService } from '../../services/toast.service.js';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project?: Project;

  section = 'tickets';
  token = localStorage.getItem('token')
  userIsAdmin = this.authService.getPayloadField(this.token, 'isAdmin')

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastService: ToastService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.section = 'tickets';
    this.getProject();
    this.toastService.showMessages();
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id)
      .subscribe(project => {
         this.project = project;
      })
  }

}
