import { TestBed } from '@angular/core/testing';

import { DevotedTimeService } from './devoted-time.service';

describe('DevotedTimeService', () => {
  let service: DevotedTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevotedTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
