import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError,delay,map,tap } from "rxjs/operators";
import { Movie } from "./movie";
import { MyList } from "./mylist";


@Injectable()
export class MovieService{
constructor(private http:HttpClient){

}

url = "http://localhost:3010/movies";
url_firebase = "https://angular-movie-app-fa239-default-rtdb.firebaseio.com/";

getMovies(categoryId:number):Observable<Movie[]> {

    let newUrl = this.url_firebase+"movies.json";

    // if(categoryId)
    // {
    //     newUrl+="?categoryId="+categoryId;
    // }

    return this.http.get<Movie[]>(this.url_firebase+"movies.json")
    .pipe(
        map(response => {
            const movies:Movie[] = [];
            for(const key in response){
            if (categoryId) {
                if(categoryId === response[key].categoryId){
                    movies.push({...response[key],id:key})
                }
            }
            else {
                movies.push({...response[key],id:key})
            }
            //   console.log({...response[key],id:key});
            }
            return movies;
         }),
        tap(data => console.log(data)),
        catchError(this.handleError),
        // delay(500)
    );
}

getAllMovies():Observable<Movie[]> {
    let newUrl = this.url_firebase+"movies.json";
    return this.http.get<Movie[]>(newUrl)
    .pipe(
        map(response => {
            const movies:Movie[] = [];
            for(const key in response){
            //   console.log({...response[key],id:key});
            movies.push({...response[key],id:key})
            }
            return movies;
         }),
        tap(data => console.log(data)),
        catchError(this.handleError)
    );
}

getById(movieId:string):Observable<Movie>{
    return this.http.get<Movie>(this.url_firebase+ "movies/"+movieId+'.json')
    .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError),
    );
}

createMovie(movie:Movie):Observable<Movie>{
    const httpOptions = {
        headers : new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Token'
        })
    }
    return this.http.post<Movie>(this.url_firebase + "/movies.json",movie,httpOptions).pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
    );
}

addToMyList(item: MyList): Observable<MyList> {
    return this.http.post<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.movieId + ".json",
    {
      dateAdded: new Date().getTime()
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    )
  }

  removeFromList(item: MyList): Observable<MyList> {
    return this.http.delete<MyList>(this.url_firebase + "/users/" + item.userId + "/list/" + item.movieId + ".json")
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      )
  }

  getList(userId:string):Observable<string[]> {
    return this.http.get<string[]>(this.url_firebase+"/users/"+userId+"/list.json")
    .pipe(
        map(response => {
            const movies:string[]=[];
            for(const key in response){
                movies.push(key);
            }
            return movies;
        }),
        tap(data => console.log(data)),
        catchError(this.handleError)
    )
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