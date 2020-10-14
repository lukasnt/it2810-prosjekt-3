import React from 'react';
import './App.css';
import Login from './components/login';
import Registration from './components/registration';
import NavigationBar from "./components/navigation/navigationbar";
import FilterList from "./components/filters/filterlist";
import MovieGrid from './components/movie/moviegrid';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import { testMovies } from './components/movie/testmovies';
import { Provider, useSelector } from "react-redux";
import { AppState, store } from "./components/utils/store";
import Search from './components/search';
import { SearchParams } from './components/utils/reducers/searchparams';
import { Movie } from './components/utils/reducers/movies';


function App() {
    
  const movies : Array<Movie> | null = useSelector((state : AppState) => state.movies);

    /* Dummy data, to be given by props */
    const filterType = "Genre";
    const filterValues =["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"];

  return (
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
                      <Search />
                      <div className="movieView">
                          <FilterList filtertype={filterType} filters={filterValues}/>
                          <MovieGrid data={movies == null ? [] : movies}/>
                      </div>
                  </Route>
              </Switch>
          </BrowserRouter>
  );
}

export default App;
