import { TestBed } from '@angular/core/testing';

import { StepOneService } from './step-one.service';

describe('StepOneService', () => {
  let service: StepOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
