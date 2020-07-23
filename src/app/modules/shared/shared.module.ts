import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddHostDirective } from './directives/add-host/add-host.directive';
import { FabComponentComponent } from './components/fab-component/fab-component.component';


@NgModule({
  entryComponents: [ConfirmComponent],
  declarations: [ConfirmComponent, AddHostDirective, FabComponentComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
    exports: [
        AddHostDirective,
        FabComponentComponent
    ],
})
export class SharedModule { }
