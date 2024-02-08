import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';


import { Project } from '../project.js';
import { ProjectService } from '../project.service.js';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrl: './edit-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectFormComponent {
  @Input() project?: Project;

  submitted = false;

  projectHasTickets = true;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) { }
  
  ngOnInit(): void {
    this.checkTickets();
  }

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

  checkTickets(): void {
    if (this.project) {
      if (this.project.tickets.length === 0) {
        this.projectHasTickets = false;
      }
    }
  }

  // deleteProject(): void {
  //   if (this.project) {
  //     this.projectService.deleteProject(this.project.id)
  //     .subscribe(_ => this.router.navigate(['/projects']));
  //   }
  // }

  deleteProject() {
    this.confirmationService.confirm({
        message: '¿Confirma que desea eliminar el proyecto?',
        accept: () => {
          if (this.project) {
            this.projectService.deleteProject(this.project.id)
            .subscribe(_ => this.router.navigate(['/projects']));
          }
        }
    });
  }
}
