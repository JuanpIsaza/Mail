import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'sent',
    loadChildren: () => import('./pages/sent/sent.module').then(m => m.SentModule)
  },
  {
    path: 'deleted',
    loadChildren: () => import('./pages/deleted/deleted.module').then(m => m.DeletedModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new/new.module').then(m => m.NewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
