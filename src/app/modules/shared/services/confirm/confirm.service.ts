import { Injectable } from '@angular/core';
import { ConfirmComponent } from '@shared/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  confirm(message: string, action: () => void) {
    this.dialog.open(ConfirmComponent, { data: {message} })
      .afterClosed().toPromise()
      .then((result: boolean) => {
        if (result) {
          action();
        }
      });
  }
}
