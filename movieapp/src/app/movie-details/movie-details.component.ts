import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie:Movie;
  loading:boolean = false;

  constructor(private  movieService:MovieService, private activatedRoute:ActivatedRoute ) {


   }

  ngOnInit(): void {

    this.loading=true;
    this.activatedRoute.params.subscribe(params => {
      this.movieService.getById(params["movieId"]).subscribe(data => {
        this.movie=data;
        this.loading=false;
      })
    })
  }

}
