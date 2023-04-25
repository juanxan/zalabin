import { TestBed } from '@angular/core/testing';

import { UserIpService } from './user-ip.service';

describe('UserIpService', () => {
  let service: UserIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
