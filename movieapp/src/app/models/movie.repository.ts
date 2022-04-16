import { Movie } from "./movie";

export class MovieRepository{
    private movies:Movie[];

    constructor(){
        this.movies=[
            {id:1,title:"Captain America",description:"Description of movie Captain America", imageUrl:"CaptainAmerica.jpg",isPopular:true},
            {id:2,title:"Fast And Furious",description:"Description of movie Fast And Furious", imageUrl:"FastAndFurious.jpg",isPopular:false},
            {id:3,title:"Lord Of The Rings",description:"Description of movie Lord Of The Rings", imageUrl:"Lotr.jpg",isPopular:true},
            {id:4,title:"Mission Impossible",description:"Description of movie Mission Impossible", imageUrl:"MissionImpossible.jpg",isPopular:false}
          ];
    }

    getMovies():Movie[]{
        return this.movies;
    }

    getPopularMovies():Movie[]{
        return this.movies.filter(x=>x.isPopular);
    }

    getMovieById(id:number):Movie | undefined{
        return this.movies.find(x=>x.id==id);
    }
}