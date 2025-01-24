import { Component } from '@angular/core';

import { ProjectService } from '../../services/project.service.js';


@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrl: './invoicing.component.scss'
})
export class InvoicingComponent {
  projects: any[] = [];

  date = new Date
  dateToPrint = this.date
  formIsValid = true

  constructor (
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProjectsDevotedTime();
  }

  getProjectsDevotedTime(): void {
    this.projectService.getProjectsDevotedTime(this.date.getFullYear(), this.date.getMonth() + 1)
      .subscribe(projectsDT => {this.projects = projectsDT, console.log(this.projects)})
  }

  onDateChange(): void {
    this.formIsValid = true
  }

  onSubmit(): void {
    this.getProjectsDevotedTime()
    this.dateToPrint = this.date
    this.formIsValid = false
  }
}
