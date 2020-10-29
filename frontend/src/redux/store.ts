import { createStore, combineReducers, Store } from "redux";
import { SearchResult, searchResultReducer } from "./reducers/searchresult";
import { SearchParams, searchParamsReducer } from "./reducers/searchparams";
import { User, userReducer } from "./reducers/user";

export type AppState = {
    user: User | null;
    searchParams: SearchParams;
    searchResult: SearchResult | null;
};

//Utility-funksjon for å kombinere flere reducere
const rootReducer = combineReducers<AppState>({
    user: userReducer,
    searchParams : searchParamsReducer,
    searchResult: searchResultReducer
});

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

//Oppretter en store
export const store = configureStore();