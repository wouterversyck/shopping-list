import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, action: string = 'Close', config: MatSnackBarConfig = { duration: 5000}) {
    this.snackBar.open(message, action, config);
  }

}
