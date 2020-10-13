import React from 'react';
import './App.css';
import Login from './components/login';
import MovieGrid from './components/movie/moviegrid';
import { testMovies } from './components/movie/testmovies';
import Registration from './components/registration';
import NavigationBar from "./components/navigation/navigationbar";
import FilterList from "./components/filters/filterlist";
import {Switch, Route, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
