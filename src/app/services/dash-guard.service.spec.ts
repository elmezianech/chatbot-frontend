import { TestBed } from '@angular/core/testing';

import { DashGuardService } from './dash-guard.service';

describe('DashGuardService', () => {
  let service: DashGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
