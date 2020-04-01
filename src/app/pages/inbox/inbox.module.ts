import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent
  }
];

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class InboxModule {}
