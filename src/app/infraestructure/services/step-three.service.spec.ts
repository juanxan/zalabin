import { TestBed } from '@angular/core/testing';

import { StepThreeService } from './step-three.service';

describe('StepThreeService', () => {
  let service: StepThreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepThreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
