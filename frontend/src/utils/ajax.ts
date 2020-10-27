import { store } from "../redux/store";
import { setLoading } from "../redux/actions/searchparams";
import { setSearchResult } from "../redux/actions/searchresult";
import { SearchParams } from "../redux/reducers/searchparams";



// Taken from MDN
// Example POST method implementation:
export async function postData(url = '', data = {}, token = "", method = "POST") : Promise<Response> {
  // Default options are marked with *
  return fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
}

let callID : number = 0;
export async function executeSearch(state : SearchParams) : Promise<void> {
    if (!state.loading) store.dispatch(setLoading(true));
    callID++;
    return fetch("http://localhost:8080/api/movie/search?" + 
        "query=" + state.query + "&" +
        "filters=" + state.genres + "&" +
        "language=" + state.language + "&" +
        "runtimeMinutes=" + state.runtimeMinutes + "&" +
        "orderField=" + state.orderField + "&" +
        "orderDir=" + state.orderDir + "&" +
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