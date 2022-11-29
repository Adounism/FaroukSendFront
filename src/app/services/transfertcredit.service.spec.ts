import { TestBed } from '@angular/core/testing';

import { TransfertcreditService } from './transfertcredit.service';

describe('TransfertcreditService', () => {
  let service: TransfertcreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransfertcreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
