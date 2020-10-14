import { setMovies } from "../actions/movies";
import { SearchParamsActions } from "../actions/searchparams";
import { store } from "../store";

//Typene brukt i state
export type SearchParams = {
    query : string;
    filters : Array<string>;
    orderField : string;
    orderDir : number;
    page : number;
    pageSize : number
};

//Reducer-funksjonen, initialiserer store med user
export function searchParamsReducer(state : SearchParams = {
    query : "",
    filters : [],
    orderField : "relevance",
    orderDir : 1,
    page : 1,
    pageSize : 25
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
        default:
            updated = false;
            break;
    }
    if (updated) {
        fetch("http://localhost:8080/api/movie/search?" + 
            "query=" + state.query + "&" +
            "filters=" + state.filters)
            .then(res => res.json())
            .then(data => {
                store.dispatch(setMovies(data))
            });
        }
    return state;
}
function neverReached(never: never) {}