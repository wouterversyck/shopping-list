import { inject, TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@core/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      MaterialModule
    ],
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }
    ]
  }));

  it('should be created', inject([SnackBarService],
    (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));

  it('should call snackBar service with default params', inject([SnackBarService, MatSnackBar],
    (service: SnackBarService, snackBar: MatSnackBar) => {
      spyOn(snackBar, 'open');

      service.showMessage('test');

      expect(snackBar.open).toHaveBeenCalledWith('test', 'Close', { duration: 5000});
    }));

  it('should call snackBar service with custom params', inject([SnackBarService, MatSnackBar],
    (service: SnackBarService, snackBar: MatSnackBar) => {
      spyOn(snackBar, 'open');

      service.showMessage('test', 'action', { duration: 2000 });

      expect(snackBar.open).toHaveBeenCalledWith('test', 'action', { duration: 2000});
    }));
});
