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
export async function searchMovies(query : string) : Promise<Array<Movie>> {
    return MovieModel.find(
        { $text: { $search: query} },
        { score: { $meta: "textScore" }})
    .sort({score: {$meta: 'textScore'}})
    .limit(50);
}