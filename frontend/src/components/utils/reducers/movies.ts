import { MovieActions } from "../actions/movies";

//Typene brukt i state
export type Movie = {
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
};

//Reducer-funksjonen, initialiserer store med user
export function moviesReducer(state : Array<Movie> | null = null, action: MovieActions) {
    switch (action.type) {
        case "SET_MOVIES":
            return state = action.payload;
        case "CLEAR_MOVIES":
            return state = [];
        default:
            neverReached(action);
    }
    return state;
}
function neverReached(never: never) {}