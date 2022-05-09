export interface Movie{
    id:any;
    title:string;
    description:string;
    imageUrl:string;
    isPopular:boolean;
    categoryId:number;
    datePublished?:number;
}