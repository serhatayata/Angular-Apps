import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";

@Injectable()
export class CategoryService{

    constructor(private http:HttpClient) {
        
        
    }

    url="http://localhost:3010/categories";

    getCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.url);
    }
}