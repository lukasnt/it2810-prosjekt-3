import { createStore, combineReducers, Store } from "redux";
import { Movie, moviesReducer } from "./reducers/movies";
import { SearchParams, searchParamsReducer } from "./reducers/searchparams";
import { User, userReducer } from "./reducers/user";

export type AppState = {
    user: User | null;
    movies: Array<Movie> | null;
    searchParams: SearchParams;
};

//Utility-funksjon for å kombinere flere reducere
const rootReducer = combineReducers<AppState>({
    user: userReducer,
    movies: moviesReducer,
    searchParams : searchParamsReducer
});

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

//Oppretter en store
export const store = configureStore();