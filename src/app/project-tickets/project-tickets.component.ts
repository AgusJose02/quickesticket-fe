import { Component, Input } from '@angular/core';

import { Project } from '../project.js';
import { Ticket } from '../ticket.js';

@Component({
  selector: 'app-project-tickets',
  templateUrl: './project-tickets.component.html',
  styleUrl: './project-tickets.component.scss'
})
export class ProjectTicketsComponent {
  @Input() project?: Project;
  tickets: Ticket[] = []

  ngOnInit(): void {
    if(this.project) {
       this.tickets = this.project?.tickets

    }
  }
}
