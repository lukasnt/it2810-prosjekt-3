import { Document, model, Model, Schema } from "mongoose";

export interface Movie {
    tconst : string;
    titleType : string;
    primaryTitle : string;
    originalTitle : string;
    isAdult : string;
    startYear : string;
    endYear : string;
    runtimeMinutes : string;
    genres : string;
    posterPath : string;
    voteAverage : string;
    voteCount : string;
    originalLanguage : string;
    overview : string;
}

export const MovieSchema : Schema = new Schema({
    tconst : String,
    titleType : String,
    primaryTitle : String,
    originalTitle : String,
    isAdult : String,
    startYear : String,
    endYear : String,
    runtimeMinutes : String,
    genres : String,
    posterPath : String,
    voteAverage : String,
    voteCount : String,
    originalLanguage : String,
    overview : String
});

export interface MovieDocument extends Movie, Document {};

export const MovieModel = model<MovieDocument>("movies", MovieSchema);

// MovieSchema.index({"$**": "text"}); // Only created once
export async function searchMovies(
     query : string,
     page : number = 1,
     pageSize : number = 50,
     orderField : string = "relevance",
     orderDir : number = 1,
     filters : Array<string> = []) : Promise<Array<Movie>>
{
    return MovieModel.find(
        { $text: { $search: query} },
        { score: { $meta: "textScore" }})
    .sort(getSortOrder(orderField, orderDir))
    .skip((page - 1) * pageSize)
    .limit(pageSize);
}

function getSortOrder(field : string, dir : number) : any {
    if (field.toLocaleLowerCase() == "relevance")
        return { score: { $meta: "textScore" }};
    else
        return JSON.parse("{ \"" + field + "\" : " + dir.toString() + "}");
}