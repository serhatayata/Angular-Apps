import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { AlertifyService } from '../services/alertify.service';
import { MovieComponent } from './movie/movie.component';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private alertify:AlertifyService, private http:HttpClient) { 
    // this.movieRepository=new MovieRepository();
    // this.movies=this.movieRepository.getMovies();
    // this.popularMovies=this.movieRepository.getPopularMovies();

    this.title="Movie List";  
    this.filteredMovies=this.movies;
  }

  title:string;
  movies:Movie[]=[];
  filteredMovies:Movie[]=[];
  popularMovies:Movie[]=[];
  
  filterText:string="";

  ngOnInit(): void {
    this.http.get<Movie[]>('http://localhost:3010/movies').subscribe(data => {
      this.movies = data;
      this.filteredMovies = this.movies;
    });

    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe( data => {
      console.log(data);
    })
  }

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

     this.alertify.success(movie.title+' added to list');
    }
    else {
      $event.target.innerText = "Add to list"
      $event.target.classList.remove('btn-danger')
      $event.target.classList.add('btn-primary')

      this.alertify.error(movie.title+' removed from the list');
    }
  }


  

  // movies = ["Captain America", "Fast And Furious", "Lord Of The Rings","Mission Impossible"];



}
