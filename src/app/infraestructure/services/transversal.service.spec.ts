import { TestBed } from '@angular/core/testing';

import { TransversalService } from './transversal.service';

describe('TransversalService', () => {
  let service: TransversalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransversalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
