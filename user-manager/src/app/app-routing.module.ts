import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  { path: 'users/:id', loadChildren: () => import('./pages/user-details/user-details.module').then(m => m.UserDetailsModule) },
  { path: 'my-page', loadChildren: () => import('./pages/my-page/my-page.module').then(m => m.MyPageModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
