import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../interfaces/project.js';
import { Ticket } from '../../interfaces/ticket.js';
import { Ticket as TicketClass } from '../../classes/ticket-class.js';
import { TicketService } from '../../services/ticket.service.js';
import { TicketStateService } from '../../services/ticket-state.service.js';
import { TicketState } from '../../interfaces/ticket-state.js';
import { AuthService } from '../../services/auth.service.js';
import { UserService } from '../../services/user.service.js';
import { User } from '../../interfaces/user.js';



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
  token = localStorage.getItem('token')

  begDate = new Date();
  endDate?: Date;
  dateValidation: boolean = true;
  userId = this.authService.getPayloadField(this.token, 'id')

  model = new TicketClass(0, 0, 0, null, '', null, 1, 0, '', null);

  ticketStates: TicketState[] = [];
  users: User[] = [];

  buttonLabel = 'Crear ticket'

  constructor(
    private ticketService: TicketService,
    private ticketStateService: TicketStateService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getTicketStates();
    this.getUsers()
    this.assingExistingTicket();
    this.renameButton();
  }

  getTicketStates(): void {
    this.ticketStateService.getTicketStates()
      .subscribe(ticketStates => this.ticketStates = ticketStates);
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users)
  }

  // Si se está editando un ticket existente
  assingExistingTicket(): void {
    if(this.ticket) {
      this.model.id = this.ticket.id;
      this.model.project = this.ticket.project.id;
      this.model.creator = this.ticket.creator.id;
      this.ticket.responsible ? this.model.responsible = this.ticket.responsible.id : this.model.responsible = null
      this.model.beginning_date = '';

      this.transformDate(this.ticket.beginning_date, this.ticket.end_date)

      this.model.state = this.ticket.state.id;
      this.model.total_time = this.ticket.total_time;
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

  // Transformación necesaria por problemas con las zonas horarias
  transformDate(date1: string, date2: string | null) {
      const begParts = date1.split('T')[0].split('-').map(Number);
      this.begDate = new Date(begParts[0], begParts[1] - 1, begParts[2]);

      if (date2) {
        const endParts = date2.split('T')[0].split('-').map(Number);
        this.endDate = new Date(endParts[0], endParts[1] - 1, endParts[2]);
      }
  }

  onSubmit() {
    // Asigno las fechas al modelo
    this.model.beginning_date = this.begDate.toDateString();
    if (this.endDate){
      this.model.end_date = this.endDate?.toDateString()
    } else {
      this.model.end_date = null;
    }

    if(this.currentUrl === 'projects') {
      this.model.project = this.project?.id;
      this.model.creator = this.userId;

      this.ticketService.addTicket(this.model)
        .subscribe(
          (newTicket: TicketClass) => this.router.navigate(['/tickets', newTicket.id])
        );
    } else if(this.currentUrl === 'tickets') {
      console.log(this.model)
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
