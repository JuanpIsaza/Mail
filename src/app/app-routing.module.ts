import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'inbox',
    loadChildren: () =>
      import('./pages/inbox/inbox.module').then(m => m.InboxModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sent',
    loadChildren: () =>
      import('./pages/sent/sent.module').then(m => m.SentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'deleted',
    loadChildren: () =>
      import('./pages/deleted/deleted.module').then(m => m.DeletedModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new/new.module').then(m => m.NewModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
