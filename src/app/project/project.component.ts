import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../project.js';
import { ProjectService } from '../project.service.js';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id)
      .subscribe(project => this.project = project)
  }
}
