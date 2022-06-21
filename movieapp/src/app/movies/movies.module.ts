import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MovieCreateComponent } from "./movie-create/movie-create.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieFilterPipe } from "./movie-filter.pipe";
import { MovieComponent } from "./movie/movie.component";
import { MoviesHomeComponent } from "./movies-home/movies-home.component";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MoviesComponent } from "./movies.component";

@NgModule({
    declarations:[
        MoviesComponent,
        MovieComponent,
        MovieDetailsComponent,
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesHomeComponent,
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MoviesRoutingModule
    ],
    exports:[
        MoviesComponent,
        MovieComponent,
        MovieDetailsComponent,
        MovieFilterPipe,
        MovieCreateComponent,
        MoviesHomeComponent,
    ]
})
export class MoviesModule{

}