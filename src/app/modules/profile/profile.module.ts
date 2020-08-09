import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { PasswordSetComponent } from './pages/password-set/password-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/modules/material/material.module';
import { ConfigComponent } from './pages/config/config.component';


@NgModule({
  declarations: [PasswordSetComponent, ConfigComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
