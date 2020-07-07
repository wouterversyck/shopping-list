import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddHostDirective } from './directives/add-host.directive';


@NgModule({
  entryComponents: [ConfirmComponent],
  declarations: [ConfirmComponent, AddHostDirective],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    AddHostDirective
  ],
})
export class SharedModule { }
