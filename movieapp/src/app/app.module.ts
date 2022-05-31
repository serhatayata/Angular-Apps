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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { AppRoutingModule } from './app-routing.module';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { AuthComponent } from './auth/auth.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './services/auth.interceptor';

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
    AuthComponent,
    CategoryCreateComponent
  ],
  imports: [ //module
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
               AlertifyService,
               { provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor, multi:true},
               { provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}
             ],  //services
  bootstrap: [AppComponent]  //starter component
})
export class AppModule { }
