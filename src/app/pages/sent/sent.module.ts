import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SentComponent } from './sent.component';

const routes: Routes = [
  {
    path: '',
    component: SentComponent
  }
];

@NgModule({
  declarations: [SentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SentModule { }
