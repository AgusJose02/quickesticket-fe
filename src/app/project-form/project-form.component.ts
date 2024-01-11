import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../project-class.js';
import { ProjectService } from '../project.service.js';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  @Output() cancel = new EventEmitter<boolean>();

  model = new Project('', '', 'wiki','2024-01-10');

  submitted = false;

  constructor(
    private projectService: ProjectService,
  ) { }

  onSubmit() {
    this.submitted = true;
    
    this.projectService.addProject(this.model)
      .subscribe(); //TODO: Contenido del subscribe
  }

  onCancel() {
    this.cancel.emit(false);
  }

}
 