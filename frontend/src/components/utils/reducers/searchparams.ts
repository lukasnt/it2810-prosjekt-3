import { setMovies } from "../actions/movies";
import { SearchParamsActions, setLoading } from "../actions/searchparams";
import { store } from "../store";

//Typene brukt i state
export type SearchParams = {
    query : string;
    filters : Array<string>;
    orderField : string;
    orderDir : number;
    page : number;
    pageSize : number;
    loading: boolean;
};

//Reducer-funksjonen, initialiserer store med user
export function searchParamsReducer(state : SearchParams = {
    query : "",
    filters : [],
    orderField : "voteCount",
    orderDir : 1,
    page : 1,
    pageSize : 25,
    loading: false
}, action: SearchParamsActions) {
    let updated :  boolean = true;
    switch (action.type) {
        case "SET_QUERY":
            state.query = action.payload;
            break;
        case "SET_FILTERS":
            state.filters = action.payload as Array<string>;
            break;
        case "SET_ORDER_FIELD":
            state.orderField = action.payload as string;
            break;
        case "SET_ORDER_DIR":
            state.orderDir = action.payload as number;
            break;
        case "SET_PAGE":
            state.page = action.payload as number;
            break;
        case "SET_PAGE_SIZE":
            state.pageSize = action.payload as number;
            break;
        case "SET_LOADING":
            state.loading = action.payload as boolean;
            updated = false;
            break;
        default:
            updated = false;
            break;
    }
    if (updated) {
        executeSearch(state);
    }
    return state;
}

export async function executeSearch(state : SearchParams) : Promise<void> {
    return fetch("http://localhost:8080/api/movie/search?" + 
        "query=" + state.query + "&" +
        "filters=" + state.filters + "&" +
        "orderField=" + state.orderField)
        .then(res => res.json())
        .then(data => {
            store.dispatch(setMovies(data));
        });
}

function neverReached(never: never) {}