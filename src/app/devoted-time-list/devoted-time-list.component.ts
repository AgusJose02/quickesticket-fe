import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DevotedTimeService } from '../devoted-time.service.js';
import { DevotedTime } from '../devoted-time.js';
import { Ticket } from '../ticket.js';
import { TicketService } from '../ticket.service.js';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-devoted-time-list',
  templateUrl: './devoted-time-list.component.html',
  styleUrl: './devoted-time-list.component.scss'
})
export class DevotedTimeListComponent {
  timeEntries: DevotedTime[] = [];
  ticket?: Ticket;

  ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));  


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private devotedTimeService: DevotedTimeService,
    private ticketService: TicketService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getTimeEntries();
    this.getTicket();
  }

  getTimeEntries(): void {
    this.devotedTimeService.getTicketsDevotedTime(this.ticketId)
      .subscribe(timeEntries => this.timeEntries = timeEntries);
  }

  getTicket(): void { //No es lo ideal, habría que hacer un populate al ticket
    this.ticketService.getTicket(this.ticketId)
      .subscribe(ticket => this.ticket = ticket);
  }

  // deleteTimeEntry(timeEntryId: number): void {
  //   this.devotedTimeService.deleteDevotedTime(timeEntryId, this.ticketId)
  //     .subscribe(() => this.deleteTimeEntryFromArray(timeEntryId));
  // }

  deleteTimeEntry(timeEntryId: number): void {
    this.confirmationService.confirm({
      message: '¿Confirma que desea eliminar la entrada?',
      accept: () => {
        this.devotedTimeService.deleteDevotedTime(timeEntryId, this.ticketId)
          .subscribe(() => this.deleteTimeEntryFromArray(timeEntryId));
      }
    });
  }

  deleteTimeEntryFromArray(id: number): void {
    this.timeEntries = this.timeEntries.filter( timeEntry => timeEntry.id !== id);
  }

  updateTimeEntry(id: number): void {
    this.router.navigate(['/tickets', this.ticketId, 'devoted-time', 'update', id]);
  }
}
