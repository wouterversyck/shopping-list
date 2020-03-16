import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  entryComponents: [ConfirmComponent],
  declarations: [ConfirmComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
