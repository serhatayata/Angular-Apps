import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movie';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { MovieService } from './movie.service';
import { MovieComponent } from './movie/movie.component';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers:[MovieService]
})
export class MoviesComponent implements OnInit {

  constructor(private alertify:AlertifyService, 
              private movieService:MovieService,
              private activatedRoute:ActivatedRoute,
              private authService:AuthService) 
  { 
    // this.movieRepository=new MovieRepository();
    // this.movies=this.movieRepository.getMovies();
    // this.popularMovies=this.movieRepository.getPopularMovies();

    this.title="Movie List";  
    this.filteredMovies=this.movies;
  }

  loading:boolean = false; 

  title:string;
  movies:Movie[]=[];
  filteredMovies:Movie[]=[];
  popularMovies:Movie[]=[];
  allMovies:Movie[]=[];
  userId:string;
  movieList:string[] = [];

  filterText:string="";
  error:any="";

  ngOnInit(): void { 
    this.authService.user.subscribe(user => {
      this.userId=user.id;

      this.loading=true;

      this.movieService.getAllMovies().subscribe(
        data => {
          this.allMovies=data;
          this.popularMovies=this.allMovies.filter(x=>x.isPopular);
        }
      );
      this.activatedRoute.params.subscribe(params => {
        this.movieService.getMovies(params["categoryId"]).subscribe(data => {
          this.movies = data;
          this.filteredMovies = this.movies;
          this.movieService.getList(this.userId).subscribe(data => {
            this.movieList = data;
            console.log(this.movieList);
          });
          this.loading=false;
        }, error => {
          this.error = error;
          this.loading=false;
        });
      });
    })
  }

  onInputChange(){
    this.filteredMovies = this.filterText? 
                          this.movies.filter(x=>x.title.indexOf(this.filterText) !== -1 || 
                          x.description.indexOf(this.filterText) !== -1) : this.movies;
  }

  getButtonState(movie:Movie){
    return this.movieList.findIndex(m => m === movie.id) > -1
  }

  addToList($event:any,movie:Movie){
    if($event.target.classList.contains('btn-primary')){
      $event.target.innerText = "Remove from list"
      $event.target.classList.remove('btn-primary')
      $event.target.classList.add('btn-danger')

      this.movieService.addToMyList({
        userId:this.userId,
        movieId:movie.id
      }).subscribe(() => this.alertify.success(movie.title+' added to list'))
    }
    else {
      $event.target.innerText = "Add to list"
      $event.target.classList.remove('btn-danger')
      $event.target.classList.add('btn-primary')
      
      this.movieService.removeFromList({
        userId:this.userId,
        movieId:movie.id
      }).subscribe(() => this.alertify.error(movie.title+' removed from the list'))

    }
  }


  

  // movies = ["Captain America", "Fast And Furious", "Lord Of The Rings","Mission Impossible"];



}
