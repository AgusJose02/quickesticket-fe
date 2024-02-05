import { Component } from '@angular/core';
import { DevotedTime } from '../devoted-time-class.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TicketService } from '../ticket.service.js';
import { DevotedTimeService } from '../devoted-time.service.js';
import { Ticket } from '../ticket.js';

@Component({
  selector: 'app-devoted-time-form',
  templateUrl: './devoted-time-form.component.html',
  styleUrl: './devoted-time-form.component.scss'
})
export class DevotedTimeFormComponent {

  ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));  
  ticket?: Ticket;

  dateValidation: boolean = true;
  dateValidationMessage: string = '';

  model = new DevotedTime(
    0, //id
    this.ticketId, //ticket
    new Date(), //date
    '', //description
    undefined, //amount
    undefined //client_time_amount
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private devotedTimeService: DevotedTimeService,
    private location: Location,
  ) { }

  ngOnInit(): void{
    this.getTicket();
  }

  onSubmit(): void {
    this.devotedTimeService.addDevotedTime(this.model, this.ticketId)
      .subscribe(() => this.router.navigate(['/tickets', this.ticketId]));
  }

  onCancel(): void {
    this.location.back();
  }

  getTicket(): void {
    this.ticketService.getTicket(this.ticketId)
      .subscribe(ticket => {
        this.ticket = ticket;
      });
  }

  validateDate(): void {
    if (this.ticket) {
      let devotedTimeDate = this.model.date
        .setHours(0,0,0,0);
      let beginningDate = new Date(this.ticket.beginning_date)
        .setHours(0,0,0,0);
      let endDate = new Date(this.ticket.end_date)
        .setHours(0,0,0,0); //-75600000

      if (devotedTimeDate < beginningDate) { // Fecha anterior a inicio
        this.dateValidation = false; 
        this.dateValidationMessage = 'La fecha es anterior a la fecha de inicio del ticket';
      } else { // no
        if (endDate !== -75600000) { // Hay fecha de fin
          if (devotedTimeDate > endDate ) { // Fecha posterior a fin
          this.dateValidation = false;
          this.dateValidationMessage = 'La fecha es posterior a la fecha de fin del ticket';
          } else { // No hay fecha de fin
            this.dateValidation = true
            }
        } 
      // } if (devotedTimeDate >= beginningDate && devotedTimeDate <= endDate) {
      //   this.dateValidation = true;
        }
    }
  }

}
