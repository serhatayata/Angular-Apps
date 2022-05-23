import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyBwDKZxWnIxIf5NfmXkjWUM6vXauHqO02k";

  
  constructor(private http:HttpClient) { }

  singUp(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.api_key,{
      email:email,
      password:password,
      returnSecureToken:true
    });
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  login(email:string,password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.api_key,{
      email:email,
      password:password,
      returnSecureToken:true
    });
    // .pipe(
    //   catchError(this.handleError)
    // );
  }
  
  // private handleError(response:HttpErrorResponse){
  //   let message = "Error occured";

  //   if (!navigator.onLine) {
  //     message="No connection found";
  //     return throwError(message);
  //   }

  //   if (response.error.error) {
  //     switch (response.error.error.message) {
  //       case "EMAIL_EXISTS": message="E-mail adress is already being used"; break;
  //       case "EMAIL_NOT_FOUND": message="E-mail not found"; break;
  //       case "INVALID_PASSWORD": message="Invalid password"; break;
  //       default: message="Error occured !"
  //         break;
  //     }
  //   }

  //   return throwError(message);
  // }

}
