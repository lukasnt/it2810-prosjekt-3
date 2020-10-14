import { Movie } from "../reducers/movies";

//Funksjoner som returnerer action-objekter
export function setMovies(movies : Array<Movie>) {
    return {
        type: "SET_MOVIES",
        payload: movies
    } as const;
}
export function clearMovies() {
    return {
        type: "CLEAR_MOVIES"
    } as const;
}
export type MovieActions = ReturnType<typeof setMovies> | ReturnType<typeof clearMovies>;
