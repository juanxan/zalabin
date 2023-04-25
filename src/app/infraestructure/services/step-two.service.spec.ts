import { TestBed } from '@angular/core/testing';

import { StepTwoService } from './step-two.service';

describe('StepTwoService', () => {
  let service: StepTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
