import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '@core/guards/login/login.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [LoginGuard],
    data: {
      authGuardRedirect: '/login'
    },
  },
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'list', loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
    canActivate: [LoginGuard],
    data: {
      authGuardRedirect: '/login'
    }
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
