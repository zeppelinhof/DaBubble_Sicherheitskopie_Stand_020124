import { TestBed } from '@angular/core/testing';

import { UserSessionCheckService } from './user-session-check.service';

describe('UserSessionCheckService', () => {
  let service: UserSessionCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSessionCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
