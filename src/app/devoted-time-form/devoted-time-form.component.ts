import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DevotedTime } from '../devoted-time-class.js';
import { DevotedTime as DevotedTimeInterface } from '../devoted-time.js';
import { TicketService } from '../ticket.service.js';
import { DevotedTimeService } from '../devoted-time.service.js';
import { Ticket } from '../ticket.js';

@Component({
  selector: 'app-devoted-time-form',
  templateUrl: './devoted-time-form.component.html',
  styleUrl: './devoted-time-form.component.scss'
})
export class DevotedTimeFormComponent {

  currentUrl = this.route.snapshot.url[3].path;

  ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));  
  ticket?: Ticket;

  dateValidation: boolean = true;
  dateValidationMessage: string = '';

  timeEntry?: DevotedTimeInterface;

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
    this.validateDate();

    if (this.currentUrl === 'update') {
      this.getExistingTimeEntry();
    }
  }

  onSubmit(): void {
    if (this.currentUrl === 'update') {
      this.devotedTimeService.updateDevotedTime(this.model,this.ticketId)
        .subscribe(() => this.router.navigate(['/tickets', this.ticketId, 'devoted-time']))
    } if (this.currentUrl === 'new') {
      this.devotedTimeService.addDevotedTime(this.model, this.ticketId)
        .subscribe(() => this.router.navigate(['/tickets', this.ticketId]));
    }
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

  getExistingTimeEntry(): void {  
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.devotedTimeService.getDevotedTime(id,this.ticketId)
      .subscribe(time => {
        this.model.id = time.id;
        this.model.ticket = Number(time.ticket);
        this.model.date = new Date(time.date);
        this.model.description = time.description;
        this.model.amount = time.amount;
        if (time.client_time_amount) {
          this.model.client_time_amount = time.client_time_amount;
        };
      })
  }

  validateDate(): void {
    this.dateValidation = true;
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
      }
    }
  }

}
