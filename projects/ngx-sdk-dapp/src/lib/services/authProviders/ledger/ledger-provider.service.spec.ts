import { TestBed } from '@angular/core/testing';

import { LedgerProviderService } from './ledger-provider.service';

describe('LedgerProviderService', () => {
  let service: LedgerProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgerProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
