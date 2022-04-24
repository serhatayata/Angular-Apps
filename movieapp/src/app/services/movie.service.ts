import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../models/movie";


@Injectable()
export class MovieService{
constructor(private http:HttpClient){

}

url = "http://localhost:3010/movies";

getMovies():Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
}

}