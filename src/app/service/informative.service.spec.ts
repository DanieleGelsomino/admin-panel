import { TestBed } from '@angular/core/testing';

import { InformativeService } from './informative.service';

describe('InformativeService', () => {
  let service: InformativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
