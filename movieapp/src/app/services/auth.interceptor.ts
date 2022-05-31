import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take,exhaustMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private authService:AuthService)
    {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //Burada request içerisine token eklenir...
        //Pipe ile süreç içerisindeki verilere müdahale ederiz.
        return this.authService.user.pipe(
            //take(1) ile gelen bilginin bir öncesini alır. 1 ise 0 dan başlıyordu ve önceki versiyonu alıyordu. BehaviourSubject...
            take(1), 
            exhaustMap(user => {
                //Eğer bir login logout için user bilgisi yoksa süreç devam etsin...
                if(!user){
                    return next.handle(req);
                }
                const updatedReq = req.clone({
                        params:new HttpParams().set('auth', user.token)
                })
                return next.handle(updatedReq);
            })
        )

        return next.handle(req); 
    }

}