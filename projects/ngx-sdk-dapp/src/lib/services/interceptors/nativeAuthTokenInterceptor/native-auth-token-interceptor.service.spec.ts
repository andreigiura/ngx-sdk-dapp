import { TestBed } from '@angular/core/testing';

import { NativeAuthTokenInterceptorService } from './native-auth-token-interceptor.service';

describe('NativeAuthTokenInterceptorService', () => {
  let service: NativeAuthTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeAuthTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
