import { Component, Input } from '@angular/core';

import { Project } from '../../interfaces/project.js';
import { ProjectService } from '../../services/project.service.js';
import { MessageService } from 'primeng/api';
import { Project as ProjectClass} from '../../classes/project-class.js';

@Component({
  selector: 'app-project-wiki',
  templateUrl: './project-wiki.component.html',
  styleUrl: './project-wiki.component.scss'
})
export class ProjectWikiComponent {
  @Input() project?: Project;


  creationDate = new Date;

  updateWiki = false;
  wikiModel = '';

  model = new ProjectClass(0, undefined, undefined, undefined, undefined);

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService
  ) { }
  
  ngOnInit(): void {
    if (this.project) {
      this.creationDate = new Date(this.project.creation_date);
    }
  }

  onEdit(): void {
    this.assingProject();
    this.updateWiki = true;
  }
  

  onSubmit(): void {
    this.updateProject();
    this.updateWiki = false
  }

  onCancel(): void {
    this.updateWiki = false;
  }
  
  updateProject(): void {
    let wiki = '';

    if (this.project && this.model.wiki) {
      wiki = this.model.wiki;

      this.projectService.updateProject(this.model)
      .subscribe(() => {
        if (this.project) {
          this.project.wiki = wiki;
        }
        this.updateWiki = false;
        this.messageService.add({severity: 'success', summary: 'Hecho!', detail: 'Wiki actualizada correctamente.'})
      });
    }
  }

  assingProject(): void {
    if (this.project) {
      this.model.id = this.project.id;
      this.model.wiki = this.project.wiki;
    }
  }
}