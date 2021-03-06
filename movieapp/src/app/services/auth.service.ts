import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_key = "AIzaSyBwDKZxWnIxIf5NfmXkjWUM6vXauHqO02k";
  user = new BehaviorSubject<User>(null); //Observable türünde...
  
  constructor(private http:HttpClient, private router:Router) { }

  singUp(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.api_key,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
      })
    );
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  login(email:string,password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.api_key,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(response => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
      })
    );
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);

    localStorage.removeItem("user");
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(!user){
      return;
    }
    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    )

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
    const expirationDate = new Date(new Date().getTime()+(expiresIn * 1000))
    const user = new User(
                          email,
                          userId,
                          token,
                          expirationDate
                         );
     //User süreç içine dahil ediliyor. Subscribe edilir.
     this.user.next(user);

     //KEEPING AT LOCAL STORAGE
      localStorage.setItem("user",JSON.stringify(user));
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
