import { Document, DocumentQuery, model, Model, Schema } from "mongoose";
import { UserSchema } from "./user";

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
//MovieSchema.index({primaryTitle: 'text', originalTitle: 'text'}); // Only created once
//MovieSchema.index({"$**": "text"}); // Only created once

export interface MovieDocument extends Movie, Document {};

export interface SearchResult {
    movies : Array<Movie>;
    pages : number;
}

export const MovieModel = model<MovieDocument>("movies", MovieSchema);

export async function searchMovies(
     query : string,
     page : number = 1,
     pageSize : number = 50,
     orderField : string = "voteCount",
     orderDir : number = -1,
     filters : Array<string> = []) : Promise<SearchResult>
{
    let mongoQuery : any = { };
    let mongoProjection : any = { };
    if (query != "") {
        mongoQuery.$text = { $search: query };
        mongoProjection.score = { $meta: "textScore" };
    } else {
        orderField = orderField == "relevance" ? "voteCount" : orderField;
    }
    if (filters[0] != "") mongoQuery.genres = { $in: getAllFilterPermutations(filters) };

    return MovieModel.find(
        mongoQuery,
        mongoProjection)
    .sort(getSortOrder(orderField, orderDir))
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .then(movies => {
        return MovieModel.find(mongoQuery, mongoProjection).countDocuments().then(count => {
            return { movies: movies, pages: Math.ceil(count / pageSize)};
        })
    });
}

function getSortOrder(field : string, dir : number) : any {
    if (field.toLocaleLowerCase() == "relevance")
        return { score: { $meta: "textScore" }};
    else
        return JSON.parse("{ \"" + field + "\" : " + dir.toString() + "}");
}

function getAllFilterPermutations(filters : Array<string>) : Array<string> {
    let result : Array<string> = [];
    if (filters.length == 1) return filters;
    for (let i = 0; i < filters.length; i++) {
        let perms : Array<string> = getAllFilterPermutations(filters.slice(0, i).concat(filters.slice(i + 1, filters.length)));

        for (let j = 0; j < perms.length; j++) {
            perms[j] = filters[i] + "," + perms[j];
        }
        result = result.concat(perms);
    }
    return result;
}