import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '@app/modules/admin/admin-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@core/material/material.module';



@NgModule({
  declarations: [UsersComponent, UserFormComponent, UserOverviewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
