import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../project.js';
import { Ticket as TicketClass } from '../ticket-class.js';
import { TicketService } from '../ticket.service.js';
import { TicketStateService } from '../ticket-state.service.js';
import { TicketState } from '../ticket-state.js';



@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent {
  @Input() project?: Project;
  @Output() cancel = new EventEmitter<string>();
  
  model = new TicketClass(0, 0, 0, null, '', null, 1, '', null)

  ticketStates: TicketState[] = [
    {
      "id": 1,
      "description": "Pendiente"
    },
    {
      "id": 2,
      "description": "En curso"
    },
    {
      "id": 3,
      "description": "Pruebas Cliente"
    },
    {
      "id": 4,
      "description": "En corrección"
    },
    {
      "id": 5,
      "description": "Cerrado"
    }
  ]

  selectedTicketSate?: TicketState;

  constructor(
    private ticketService: TicketService,
    private ticketStateService: TicketStateService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    // this.ticketStateService.getTicketStates()
    //   .subscribe(ticketStates => this.ticketStates = ticketStates);
    this.selectedTicketSate = undefined;
  }

  onSubmit() {
    this.model.project = this.project?.id;
    this.model.state = this.selectedTicketSate?.id;

    this.ticketService.addTicket(this.model)
      .subscribe(
        (newTicket: TicketClass) => this.router.navigate(['/tickets', newTicket.id])
      );
  }

  onCancel() {
    this.cancel.emit('tickets');
  }
}
