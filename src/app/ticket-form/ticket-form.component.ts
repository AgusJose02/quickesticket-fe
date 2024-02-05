import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../project.js';
import { Ticket } from '../ticket.js';
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
  @Input() ticket?: Ticket;

  @Output() cancel = new EventEmitter<string>();
  @Output() ticketUpdated = new EventEmitter<boolean>();

  currentUrl = this.route.snapshot.url[0].path;

  begDate = new Date();
  endDate?: Date;
  dateValidation: boolean = true;

  model = new TicketClass(0, 0, 1, null, '', null, 1, 0, '', null);

  ticketStates: TicketState[] = [];

  buttonLabel = 'Crear ticket'

  constructor(
    private ticketService: TicketService,
    private ticketStateService: TicketStateService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getTicketStates();

    this.assingExistingTicket();

    this.renameButton();
    
  }

  getTicketStates(): void {
    this.ticketStateService.getTicketStates()
      .subscribe(ticketStates => this.ticketStates = ticketStates);
  }

  assingExistingTicket(): void { // Si se está editando un ticket existente
    if(this.ticket) {
      this.model.id = this.ticket.id;
      this.model.project = this.ticket.project.id;
      this.model.creator = this.ticket.creator;
      this.model.responsible = this.ticket.responsible;
      this.model.beginning_date = '';
      this.begDate = new Date(this.ticket.beginning_date);
      if(this.ticket.end_date) {
        this.endDate = new Date(this.ticket.end_date);
      };
      this.model.state = this.ticket.state.id;
      this.model.total_hours = this.ticket.total_hours;
      this.model.title = this.ticket.title;
      this.model.description = this.ticket.description;
    }
  }

  renameButton(): void {
    if(this.currentUrl === 'tickets') {
      this.buttonLabel = 'Guardar';
    }
  }

  validateEndDate() {
    if(this.endDate) {
      let from = this.begDate.setHours(0,0,0,0)
      let to = this.endDate.setHours(0,0,0,0)
      this.dateValidation = false;
      if(to >= from) {
        this.dateValidation = true;
      }
    }
  }

  onSubmit() {
    // Asigno las fechas al modelo
    this.model.beginning_date = this.begDate.toDateString();
    if (this.endDate){
      this.model.end_date = this.endDate?.toDateString()
    }

    if(this.currentUrl === 'projects') {
      this.model.project = this.project?.id;

      this.ticketService.addTicket(this.model)
        .subscribe(
          (newTicket: TicketClass) => this.router.navigate(['/tickets', newTicket.id])
        );
    } else if(this.currentUrl === 'tickets') {
      this.ticketService.updateTicket(this.model)
        .subscribe(_ => this.ticketUpdated.emit(false))
    }
  }

  onCancel() {
    if(this.currentUrl === 'projects') {
      this.cancel.emit('tickets');
    } else if(this.currentUrl === 'tickets') {
      this.cancel.emit('cancel');
    }
  }
}
