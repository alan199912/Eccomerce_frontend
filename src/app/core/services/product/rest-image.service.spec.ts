import { TestBed } from '@angular/core/testing';

import { RestImageService } from './rest-image.service';

describe('RestImageService', () => {
  let service: RestImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
