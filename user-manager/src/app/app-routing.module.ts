import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register/register.component';
import { AuthGuard } from './shared/services/guards/auth/auth.guard';
import { EditGuard } from './shared/services/guards/edit/edit.guard';
import { UserDetailsResolver } from './shared/services/user-details/user-details.resolver';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  {
    path: 'users/:id', loadChildren: () => import('./pages/user-details/user-details.module').then(m => m.UserDetailsModule), canActivate: [AuthGuard], canDeactivate: [EditGuard],
    resolve: {
      productInfo: UserDetailsResolver
    }
  },
  { path: 'my-page', loadChildren: () => import('./pages/my-page/my-page.module').then(m => m.MyPageModule), canDeactivate: [EditGuard], canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
