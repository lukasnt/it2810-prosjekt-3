import { UserActions } from "../actions/users";

//Typene brukt i state
export type User = {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
};

//Reducer-funksjonen, initialiserer store med user
export function userReducer(state : User | null = getUserFromLocalStorage(), action: UserActions) {
    let updated : boolean = true;
    switch (action.type) {
        case "SET_USER":
            state = action.payload;
            break;
        case "REMOVE_USER":
            state = null;
            break;
        default:
            updated = false;
    }

    if (updated) {
        console.log(state);
        console.log("stringyfy state:" + JSON.stringify(state));
        localStorage.setItem("user", JSON.stringify(state));
    }

    return state;
}

function getUserFromLocalStorage() : User | null {
    let value : string | null = localStorage.getItem("user");
    return value == null ? value : JSON.parse(value) as User;
}

function neverReached(never: never) {}