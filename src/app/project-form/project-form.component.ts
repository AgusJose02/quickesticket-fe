import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../project.service.js';
import { Project as ProjectClass } from '../project-class.js';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  @Output() cancel = new EventEmitter<boolean>();

  model = new ProjectClass(0,'', '', 'wiki','2024-01-10');

  submitted = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  onSubmit() {
    this.submitted = true;
    
    this.projectService.addProject(this.model)
      .subscribe(
        (newProject: ProjectClass) => this.router.navigate(['/projects', newProject.id])
      );
  }

  onCancel() {
    this.cancel.emit(false);
  }

}
 