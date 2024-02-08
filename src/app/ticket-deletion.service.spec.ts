import { TestBed } from '@angular/core/testing';

import { TicketDeletionService } from './ticket-deletion.service';

describe('TicketDeletionService', () => {
  let service: TicketDeletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketDeletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
