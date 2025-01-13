import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DevotedTimeService } from '../../services/devoted-time.service.js';
import { DevotedTime } from '../../interfaces/devoted-time.js';
import { Ticket } from '../../interfaces/ticket.js';
import { TicketService } from '../../services/ticket.service.js';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service.js';

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
    private messageService: MessageService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.getTimeEntries();
    this.getTicket();
    this.toastService.showMessages();
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
        this.messageService.add({severity: 'success', summary: 'Hecho!', detail: 'Entrada de tiempo eliminada correctamente.'});
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
