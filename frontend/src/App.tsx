import React from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import NavigationBar from "./components/navigation/navigationbar";
import FilterList from "./components/filters/filterlist";
import MovieGrid from './components/movie/moviegrid';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import { testMovies } from './components/movie/testmovies';
import { Provider } from "react-redux";
import { store } from "./components/utils/store";


function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <NavigationBar/>
              <Switch>
                  <Route path="/login">
                      <Login />
                  </Route>
                  <Route path="/registration">
                      <Registration />
                  </Route>
                  <Route path="/">
                      <div className="movieView">
                          <FilterList />
                          <MovieGrid data={testMovies}/>
                      </div>
                  </Route>
              </Switch>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
