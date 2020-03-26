import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletedComponent } from './deleted.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DeletedComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DeletedModule { }
