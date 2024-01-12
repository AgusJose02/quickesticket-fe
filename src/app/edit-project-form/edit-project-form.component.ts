import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../project.js';
import { ProjectService } from '../project.service.js';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrl: './edit-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProjectFormComponent {
  @Input() project?: Project;

  submitted = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  onSubmit() {
    this.submitted = true;
    this.updateProject()
  }

  // TODO: SE PODRÍA UTILIZAR PATCH EN LUGAR DE PUT
  updateProject(): void {
    if (this.project) {
      this.projectService.updateProject(this.project)
        .subscribe();
    }
  }

  deleteProject(): void {
    if (this.project) {
      this.projectService.deleteProject(this.project.id)
      .subscribe(_ => this.router.navigate(['/projects']));
    }
  }

}
