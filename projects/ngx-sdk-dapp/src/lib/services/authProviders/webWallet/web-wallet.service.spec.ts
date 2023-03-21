import { TestBed } from '@angular/core/testing';

import { WebWalletService } from './web-walletProvider.service';

describe('WebWalletService', () => {
  let service: WebWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
