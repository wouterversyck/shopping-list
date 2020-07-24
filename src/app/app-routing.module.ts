import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@core/guards/login/login.guard';
import { AdminGuard } from '@core/guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'list', loadChildren: () => import('./modules/notes/notes.module').then(m => m.NotesModule),
    canActivate: [LoginGuard],
    data: {
      authGuardRedirect: '/login'
    }
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [LoginGuard, AdminGuard],
    data: {
      authGuardRedirect: '/login'
    }
  },
  {
    path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
