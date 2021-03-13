import { TestBed } from '@angular/core/testing';

import { RentalDetailService } from './rental-detail.service';

describe('RentalDetailService', () => {
  let service: RentalDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
