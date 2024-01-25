import { TestBed } from '@angular/core/testing';

import { ClickOutsideDirectiveService } from './click-outside-directive.service';

describe('ClickOutsideDirectiveService', () => {
  let service: ClickOutsideDirectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickOutsideDirectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
