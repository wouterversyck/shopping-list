import { inject, TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }
    ]
  }));

  it('should be created', inject([AuthenticationService],
    (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
