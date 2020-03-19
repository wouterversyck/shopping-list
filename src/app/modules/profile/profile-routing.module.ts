import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordSetComponent } from '@app/modules/profile/password-set/password-set.component';


const routes: Routes = [
  {
    path: 'passwordset',
    component: PasswordSetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
