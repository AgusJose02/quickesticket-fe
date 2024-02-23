import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../entities/project.js';
import { ProjectService } from '../../services/project.service.js';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project?: Project;

  section = 'tickets';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getProject();
    this.section = 'tickets';
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id)
      .subscribe(project => {
         this.project = project;
      })
  }

}
