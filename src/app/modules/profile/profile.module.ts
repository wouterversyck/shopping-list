import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PasswordSetComponent } from './password-set/password-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/modules/material/material.module';


@NgModule({
  declarations: [PasswordSetComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
