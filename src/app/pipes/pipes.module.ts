import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFavoritesPipe } from './filter-favorites/filter-favorites.pipe';

@NgModule({
  declarations: [FilterFavoritesPipe],
  imports: [CommonModule],
  exports: [FilterFavoritesPipe]
})
export class PipesModule {}
