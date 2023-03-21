import { TestBed } from '@angular/core/testing';

import { XPortalService } from './x-portal.service';

describe('XPortalService', () => {
  let service: XPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
