import { UserActions } from "../actions/users";

//Typene brukt i state
export type User = {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
};

//Reducer-funksjonen, initialiserer store med user
export function userReducer(state : User | null = null, action: UserActions) {
    switch (action.type) {
        case "SET_USER":
            return state = ({ 
                    email: action.payload.email, 
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    token: action.payload.token 
                });
        case "REMOVE_USER":
            return state = null;
        default:
            neverReached(action);
    }
    return state;
}
function neverReached(never: never) {}