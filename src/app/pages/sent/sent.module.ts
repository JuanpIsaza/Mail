import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SentComponent } from './sent.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterSearchPipe } from 'src/app/pipes/filter-search/filter-search.pipe';

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
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FilterSearchPipe],
  exports: [RouterModule]
})
export class SentModule {}
