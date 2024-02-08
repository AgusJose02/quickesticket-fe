import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketDeletionService {

  private ticketDeletionSubject = new Subject<number>(); 

  constructor() { }

  notifyTicketDeleted(ticketId: number): void {
    this.ticketDeletionSubject.next(ticketId);
  }

  onTicketDeletion(): Observable<number> {
    return this.ticketDeletionSubject.asObservable();
  }
}
