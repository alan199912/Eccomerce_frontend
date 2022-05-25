import { TestBed } from '@angular/core/testing';

import { MainImageService } from './main-image.service';

describe('MainImageService', () => {
  let service: MainImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
