import { Component, Output, EventEmitter } from '@angular/core';
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

  model = new ProjectClass(
    0, //id
    '', //name
    null, //description
    null, //wiki
    '' //creation_date
  );

  creationDate = new Date;

  submitted = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  onSubmit() {
    this.submitted = true;

    this.model.creation_date = this.creationDate.toDateString()
    
    this.projectService.addProject(this.model)
      .subscribe(
        (newProject: ProjectClass) => this.router.navigate(['/projects', newProject.id])
      );
  }

  onCancel() {
    this.cancel.emit(false);
  }

}
 