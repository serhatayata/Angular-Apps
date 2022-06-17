import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Movie } from '../movies/movie';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(movies:Movie[],filterText:string):Movie[] {
    filterText = filterText.toLowerCase();
    return filterText ? movies.filter(x=>x.title.toLowerCase().indexOf(filterText) !== -1 || 
    x.description.toLowerCase().indexOf(filterText) !== -1) :movies
  }

}
