import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterFavoritesPipe } from './filter-favorites/filter-favorites.pipe';
import { FilterSearchPipe } from './filter-search/filter-search.pipe';

@NgModule({
  declarations: [FilterFavoritesPipe, FilterSearchPipe],
  imports: [CommonModule],
  exports: [FilterFavoritesPipe]
})
export class PipesModule {}
