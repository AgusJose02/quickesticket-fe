import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

import { Project } from '../../interfaces/project.js';
import { Project as ProjectClass } from '../../classes/project-class.js';
import { ProjectService } from '../../services/project.service.js';
import { ToastService } from '../../services/toast.service.js';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrl: './edit-project-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProjectFormComponent {
  @Input() project?: Project;


  formIsValid = false;

  projectHasTickets = true;

  model = new ProjectClass(0, undefined, undefined, undefined, undefined);

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toastService: ToastService,
  ) { }
  
  ngOnInit(): void {
    this.checkTickets();
    this.assingProject();
  }

  onSubmit() {
    this.formIsValid = false;
    this.messageService.add({severity: 'success', summary: 'Hecho!', detail: 'Proyecto actualizado correctamente.'})
      
    this.updateProject();
    if (this.model.name && this.project) {
      this.project.name = this.model.name;
    } if (this.model.description && this.project) {
      this.project.description = this.model.description;
    }
  }

  onProjectChange(): void {
    this.formIsValid = true
  }


  assingProject(): void {
    if (this.project) {
      this.model.id = this.project.id;
      this.model.name = this.project.name;
      this.model.description = this.project.description;
    }
  }

  updateProject(): void {
    if (this.project) {
      this.projectService.updateProject(this.model)
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

  deleteProject() {
    this.confirmationService.confirm({
        message: '¿Confirma que desea eliminar el proyecto?',
        accept: () => {
          if (this.project) {
            this.toastService.addMessage({severity: 'success', summary: 'Hecho!', detail: 'Proyecto eliminado correctamente.'})
            this.projectService.deleteProject(this.project.id)
            .subscribe(_ => this.router.navigate(['/projects']));
          }
        }
    });
  }
}
