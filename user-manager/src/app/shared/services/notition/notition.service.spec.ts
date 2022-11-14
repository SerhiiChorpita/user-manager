import { TestBed } from '@angular/core/testing';

import { NotitionService } from './notition.service';

describe('NotitionService', () => {
  let service: NotitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
