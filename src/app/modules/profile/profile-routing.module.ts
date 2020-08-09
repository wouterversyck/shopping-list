import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordSetComponent } from '@app/modules/profile/pages/password-set/password-set.component';
import { ConfigComponent } from './pages/config/config.component';


const routes: Routes = [
  {
    path: 'passwordset',
    component: PasswordSetComponent
  },
  {
    path: 'config',
    component: ConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
