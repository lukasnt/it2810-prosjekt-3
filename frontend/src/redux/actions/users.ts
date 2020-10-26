import { Movie } from "../reducers/searchresult";
import { User } from "../reducers/user";

//Funksjoner som returnerer action-objekter
export function setUser(user : User | null) {
    return {
        type: "SET_USER",
        payload: user
    } as const;
}

export function removeUser() {
    return {
        type: "REMOVE_USER"
    } as const;
}

export function addFavorite(movie : Movie) {
    return {
        type: "ADD_FAVORITE",
        payload: movie
    } as const;
}

export function removeFavorite(movie : Movie) {
    return {
        type: "REMOVE_FAVORITE",
        payload: movie
    } as const;
}

export type UserActions = ReturnType<typeof setUser> | 
    ReturnType<typeof removeUser> | 
    ReturnType<typeof addFavorite> | 
    ReturnType<typeof removeFavorite>;
