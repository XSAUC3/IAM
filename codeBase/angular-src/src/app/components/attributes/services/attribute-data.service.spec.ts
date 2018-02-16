import { TestBed, inject } from '@angular/core/testing';

import { AttributeDataService } from './attribute-data.service';

describe('AttributeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeDataService]
    });
  });

  it('should be created', inject([AttributeDataService], (service: AttributeDataService) => {
    expect(service).toBeTruthy();
  }));
});
