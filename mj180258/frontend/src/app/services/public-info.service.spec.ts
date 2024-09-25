import { TestBed } from '@angular/core/testing';

import { PublicInfoService } from './public-info.service';

describe('PublicInfoService', () => {
  let service: PublicInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
