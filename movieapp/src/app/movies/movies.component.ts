import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor() { 
    this.movieRepository=new MovieRepository();
    this.movies=this.movieRepository.getMovies();
    this.title="Movie List";  
    this.popularMovies=this.movieRepository.getPopularMovies();
    this.filteredMovies=this.movies;
  }

  title:string;
  movies:Movie[];
  filteredMovies:Movie[];
  popularMovies:Movie[];
  movieRepository:MovieRepository;
  
  filterText:string="";

  onInputChange(){
    this.filteredMovies = this.filterText? 
                          this.movies.filter(x=>x.title.indexOf(this.filterText) !== -1 || 
                          x.description.indexOf(this.filterText) !== -1) : this.movies;
  }

  addToList($event:any,movie:Movie){
    if($event.target.classList.contains('btn-primary')){
      $event.target.innerText = "Remove from list"
      $event.target.classList.remove('btn-primary')
      $event.target.classList.add('btn-danger')
    }
    else {
      $event.target.innerText = "Add to list"
      $event.target.classList.remove('btn-danger')
      $event.target.classList.add('btn-primary')
    }
  }

  ngOnInit(): void {
  }
  

  // movies = ["Captain America", "Fast And Furious", "Lord Of The Rings","Mission Impossible"];



}
