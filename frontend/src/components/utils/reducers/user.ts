import { UserActions } from "../actions/users";
import { Movie } from "./searchresult";

//Typene brukt i state
export type User = {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    favorites: Array<Movie>;
};

//Reducer-funksjonen, initialiserer store med user
export function userReducer(state : User | null = getUserFromLocalStorage(), action: UserActions) {
    let updated : boolean = true;

    let newState : User | null = state != null ? {
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName,
        token: state.token,
        favorites: state.favorites
    } : null ;

    switch (action.type) {
        case "SET_USER":
            newState = action.payload;
            break;
        case "REMOVE_USER":
            newState = null;
            break;
        case "ADD_FAVORITE":
            if (newState != null) newState.favorites.push(action.payload);
            break;
        case "REMOVE_FAVORITE":
            if (newState != null) newState.favorites = newState.favorites.filter(movie => movie.tconst != action.payload.tconst);
            break;
        default:
            updated = false;
    }

    if (updated) {
        localStorage.setItem("user", JSON.stringify(newState));
    }

    return newState;
}

function getUserFromLocalStorage() : User | null {
    let value : string | null = localStorage.getItem("user");
    return value == null ? value : JSON.parse(value) as User;
}

function neverReached(never: never) {}