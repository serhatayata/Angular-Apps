import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // movies = ["Captain America", "Fast And Furious", "Lord Of The Rings","Mission Impossible"];
  movies = [
    {id:1,title:"Captain America",description:"Description of movie Captain America", imageUrl:"CaptainAmerica.jpg"},
    {id:2,title:"Fast And Furious",description:"Description of movie Fast And Furious", imageUrl:"FastAndFurious.jpg"},
    {id:3,title:"Lord Of The Rings",description:"Description of movie Lord Of The Rings", imageUrl:"Lotr.jpg"},
    {id:4,title:"Mission Impossible",description:"Description of movie Mission Impossible", imageUrl:"MissionImpossible.jpg"}
  ]

}
