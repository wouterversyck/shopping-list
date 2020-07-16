import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddHostDirective } from './directives/add-host/add-host.directive';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';


@NgModule({
  entryComponents: [ConfirmComponent],
  declarations: [ConfirmComponent, AddHostDirective, SafeHtmlPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    AddHostDirective,
    SafeHtmlPipe
  ],
})
export class SharedModule { }
