import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { AlertifyService } from '../services/alertify.service';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers:[CategoryService,MovieService]
})
export class MovieCreateComponent implements OnInit {

  constructor(private categoryService:CategoryService, 
              private movieService:MovieService, 
              private router:Router,
              private alertify:AlertifyService
              ) { }

  categories:Category[];
  error:string;
  model:any = {
    categoryId:''
  };

  movieForm = new FormGroup({
    title: new FormControl("Movie name" ),
    description: new FormControl("Description"),
    imageUrl: new FormControl("1.jpeg"),
    categoryId: new FormControl("2")
  })

  clearForm(){
    this.movieForm.patchValue({
      title:'',
      description:'',
      imageUrl:'',
      categoryId:''
    });
  }

  createMovie(){

    // console.log(this.model)
    // console.log(form)


    // if(title.value === "" || description.value ==="" || imageUrl.value ==="" || categoryId.value==="-1")
    // {
    //   this.alertify.error("Inputs cannot be empty...");
    //   return;
    // }

    // if(title.value.length < 5)
    // {
    //   this.alertify.error("Title cannot have less then 5 characters.");
    //   return;
    // }

    // if(description.value.length < 10 || description.value.length > 50)
    // {
    //   this.alertify.error("Description can be between 10-50 characters.");
    //   return;
    // }

    // const extensions = ["jpeg","jpg","png"];
    // const extension = imageUrl.value.split('.').pop();
    
    // if(extensions.indexOf(extension) === -1)
    // {
    //   this.alertify.error("You can only use 'JPEG' - 'JPG' - 'PNG'");
    //   return;
    // }

    const movie = { 
      id:0,
      title:this.model.title, 
      description:this.model.description, 
      imageUrl:this.model.imageUrl, 
      datePublished: new Date().getTime(),
      categoryId:this.model.categoryId,
      isPopular:false
    };

    this.movieService.createMovie(movie).subscribe(data => {
      console.log(data);
      this.router.navigate(['/movies', data.id]);
    });    

  }

  log(value:any){
    console.log(value);
  }
  

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe( data => {
      this.categories=data;
    });
  }

}
