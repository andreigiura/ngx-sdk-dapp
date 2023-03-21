import { TestBed } from '@angular/core/testing';

import { PingPongContractService } from './ping-pong-contract.service';

describe('PingPongContractService', () => {
  let service: PingPongContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PingPongContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
