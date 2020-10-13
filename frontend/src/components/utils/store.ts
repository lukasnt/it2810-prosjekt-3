import { createStore, combineReducers, Store } from "redux";

//Typene brukt i state
export type User = {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
};

export type AppState = {
    user: User | null;
};

//Funksjoner som returnerer action-objekter
export function setUser(user : User) {
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
type Actions = ReturnType<typeof setUser> | ReturnType<typeof removeUser>;

//Reducer-funksjonen, initialiserer store med user
function userReducer(state : User | null = null, action: Actions) {
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

//Utility-funksjon for å kombinere flere reducere
const rootReducer = combineReducers<AppState>({
    user: userReducer
});

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

//Oppretter en store
export const store = configureStore();