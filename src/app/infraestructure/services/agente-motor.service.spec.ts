import { TestBed } from '@angular/core/testing';

import { AgenteMotorService } from './agente-motor.service';

describe('AgenteMotorService', () => {
  let service: AgenteMotorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenteMotorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
