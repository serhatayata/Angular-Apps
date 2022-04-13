import { Movie } from "./movie";

export class MovieRepository{
    private movies:Movie[];

    constructor(){
        this.movies=[
            {id:1,title:"Captain America",description:"Description of movie Captain America", imageUrl:"CaptainAmerica.jpg"},
            {id:2,title:"Fast And Furious",description:"Description of movie Fast And Furious", imageUrl:"FastAndFurious.jpg"},
            {id:3,title:"Lord Of The Rings",description:"Description of movie Lord Of The Rings", imageUrl:"Lotr.jpg"},
            {id:4,title:"Mission Impossible",description:"Description of movie Mission Impossible", imageUrl:"MissionImpossible.jpg"}
          ];
    }

    getMovies():Movie[]{
        return this.movies;
    }

    getMovieById(id:number):Movie | undefined{
        return this.movies.find(x=>x.id==id);
    }
}