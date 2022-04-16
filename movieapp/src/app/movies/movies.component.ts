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
  }

  title:string;
  movies:Movie[];
  popularMovies:Movie[];
  movieRepository:MovieRepository;

  ngOnInit(): void {
  }
  

  // movies = ["Captain America", "Fast And Furious", "Lord Of The Rings","Mission Impossible"];



}
