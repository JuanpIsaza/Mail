import { TestBed } from '@angular/core/testing';

import { DeletedService } from './deleted.service';

describe('DeletedService', () => {
  let service: DeletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
