import { TestBed } from '@angular/core/testing';

import { ConfirmService } from './confirm.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('ConfirmService', () => {
  let service: ConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule]
    });
    service = TestBed.inject(ConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
