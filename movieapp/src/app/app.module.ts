import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { AlertifyService } from './services/alertify.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { AppRoutingModule } from './app-routing.module';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
  declarations: [ //component
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    FooterComponent,
    MovieFilterPipe,
    MovieCreateComponent,
    CategoryCreateComponent
  ],
  imports: [ //module
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AlertifyService],  //services
  bootstrap: [AppComponent]  //starter component
})
export class AppModule { }
