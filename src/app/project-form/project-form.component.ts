import { Component } from '@angular/core';

import { Project } from '../project-class.js';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {

  model = new Project(10, '', '', '', '');

  submitted = false;

  onSubmit() { this.submitted = true; }

  newProject() {
    this.model = new Project(11, '', '', '', '2024-01-10')
  }

}
