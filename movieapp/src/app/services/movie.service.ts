import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs-compat/operator/map";
import { catchError,tap } from "rxjs/operators";
import { Movie } from "../models/movie";


@Injectable()
export class MovieService{
constructor(private http:HttpClient){

}

url = "http://localhost:3010/movies";

getMovies(categoryId:number):Observable<Movie[]> {

    let newUrl = this.url;

    if(categoryId)
    {
        newUrl+="?categoryId="+categoryId;
    }

    return this.http.get<Movie[]>(newUrl)
    .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
    );
}

getAllMovies():Observable<Movie[]> {

    return this.http.get<Movie[]>(this.url)
    .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
    );
}


private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
        //client or network errors
        console.log("Error : " + error.error.message)
    }
    else {
        // backend api errors
        switch(error.status){
            case 404: console.log("Not found"); break;
            case 403: console.log("Access Denied !"); break;
            case 500: console.log("Internal Error !"); break;
            default: console.log("Unknown Error !") 
        }
    }
    return throwError("An error has occured !");
}

}