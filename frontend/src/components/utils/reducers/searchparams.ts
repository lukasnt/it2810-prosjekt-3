import { setSearchResult } from "../actions/searchresult";
import { SearchParamsActions, setLoading } from "../actions/searchparams";
import { store } from "../store";

//Typene brukt i state
export type SearchParams = {
    query : string;
    genres : Array<string>;
    language : string;
    runtimeMinutes : Array<number>;
    orderField : string;
    orderDir : number;
    page : number;
    pageSize : number;
    loading: boolean;
};

//Reducer-funksjonen, initialiserer store med user
export function searchParamsReducer(state : SearchParams = {
    query : "",
    genres : [],
    language : "",
    runtimeMinutes : [],
    orderField : "voteCount",
    orderDir : 1,
    page : 1,
    pageSize : 18,
    loading: true
}, action: SearchParamsActions) {
    let updated :  boolean = true;
    let pageUpdated : boolean = false;
    
    let newState : SearchParams = {
        query: state.query,
        genres : state.genres,
        language : state.language,
        runtimeMinutes : state.runtimeMinutes,
        orderField: state.orderField,
        orderDir: state.orderDir,
        page: state.page,
        pageSize : state.pageSize,
        loading: state.loading
    }

    switch (action.type) {
        case "SET_QUERY":
            newState.query = action.payload;
            break;
        case "SET_GENRES":
            newState.genres = action.payload as Array<string>;
            break;
        case "SET_LANGUAGE":
            newState.language = action.payload as string;
            break;
        case "SET_RUNTIME_MINUTES":
            newState.runtimeMinutes = action.payload as Array<number>;
            break;
        case "SET_ORDER_FIELD":
            newState.orderField = action.payload as string;
            break;
        case "SET_ORDER_DIR":
            newState.orderDir = action.payload as number;
            break;
        case "SET_PAGE":
            newState.page = action.payload as number;
            pageUpdated = true;
            break;
        case "SET_PAGE_SIZE":
            newState.pageSize = action.payload as number;
            break;
        case "SET_LOADING":
            newState.loading = action.payload as boolean;
            updated = false;
            break;
        default:
            updated = false;
            newState = state;
            break;
    }

    if (updated && !pageUpdated) {
        newState.page = 1;
    }
    if (updated) {
        executeSearch(newState);
    }

    return newState;
}

let callID : number = 0;
export async function executeSearch(state : SearchParams) : Promise<void> {
    state.loading = true;
    callID++;
    return fetch("http://localhost:8080/api/movie/search?" + 
        "query=" + state.query + "&" +
        "filters=" + state.genres + "&" +
        "language=" + state.language + "&" +
        "runtimeMinutes=" + state.runtimeMinutes + "&" +
        "orderField=" + state.orderField + "&" +
        "page=" + state.page + "&" +
        "pageSize=" + state.pageSize + "&" +
        "callID=" + callID)
        .then(res => res.json())
        .then(data => {
            if (data.callID == callID) {
                store.dispatch(setSearchResult(data.result));
                store.dispatch(setLoading(false));
            }
        });
}

function neverReached(never: never) {}